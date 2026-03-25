import os
import re

from PIL import Image, ImageFilter, ImageOps
import pytesseract

from app.services.translation_service import translate_text


def _configure_tesseract() -> None:
    env_tesseract_cmd = os.getenv("TESSERACT_CMD", "").strip()
    if env_tesseract_cmd and os.path.exists(env_tesseract_cmd):
        pytesseract.pytesseract.tesseract_cmd = env_tesseract_cmd
        return

    candidate_paths = [
        r"C:\Program Files\Tesseract-OCR\tesseract.exe",
        r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
    ]

    for candidate in candidate_paths:
        if os.path.exists(candidate):
            pytesseract.pytesseract.tesseract_cmd = candidate
            return


def _get_tesseract_lang(source_language: str) -> str:
    lang_map = {
        "english": "eng",
        "hindi": "hin",
        "bengali": "ben",
        "spanish": "spa",
        "french": "fra",
    }
    return lang_map.get(source_language.lower().strip(), "eng")


def _build_ocr_candidates(image: Image.Image) -> list[Image.Image]:
    grayscale = ImageOps.grayscale(image)
    base = ImageOps.autocontrast(grayscale)
    denoised = base.filter(ImageFilter.MedianFilter(size=3))

    candidates = [
        base,
        base.filter(ImageFilter.SHARPEN),
        denoised,
        denoised.filter(ImageFilter.SHARPEN),
    ]

    threshold_160 = base.point(lambda pixel: 255 if pixel > 160 else 0).convert("L")
    threshold_180 = base.point(lambda pixel: 255 if pixel > 180 else 0).convert("L")
    threshold_denoised = denoised.point(lambda pixel: 255 if pixel > 170 else 0).convert("L")
    candidates.extend([threshold_160, threshold_180])
    candidates.append(threshold_denoised)

    upscaled_candidates = []
    for candidate in candidates:
        width, height = candidate.size
        upscaled_candidates.append(
            candidate.resize((max(width * 2, 1), max(height * 2, 1)), Image.Resampling.LANCZOS)
        )

    candidates.extend(upscaled_candidates)
    return candidates


def _ocr_score(image: Image.Image, tesseract_lang: str, config: str) -> tuple[str, float]:
    data = pytesseract.image_to_data(
        image,
        lang=tesseract_lang,
        config=config,
        output_type=pytesseract.Output.DICT,
    )

    texts: list[str] = []
    confidences: list[float] = []

    raw_texts = data.get("text", [])
    raw_confidences = data.get("conf", [])

    for raw_text, raw_confidence in zip(raw_texts, raw_confidences):
        text = (raw_text or "").strip()
        if not text:
            continue

        try:
            confidence = float(raw_confidence)
        except (TypeError, ValueError):
            confidence = -1

        if confidence < 0:
            continue

        texts.append(text)
        confidences.append(confidence)

    combined_text = " ".join(texts).strip()
    if not combined_text:
        return "", -1.0

    average_confidence = sum(confidences) / len(confidences) if confidences else 0.0
    score = (average_confidence * 2.0) + len(texts)
    return combined_text, score


def _extract_best_text(image: Image.Image, tesseract_lang: str) -> str:
    configs = ["--oem 3 --psm 6", "--oem 3 --psm 3", "--oem 3 --psm 11"]
    candidates = _build_ocr_candidates(image)

    best_text = ""
    best_score = -1.0

    for candidate in candidates:
        for config in configs:
            extracted_text, score = _ocr_score(candidate, tesseract_lang, config)
            if score > best_score:
                best_score = score
                best_text = extracted_text

    if best_text:
        return best_text

    fallback_text = pytesseract.image_to_string(
        candidates[0],
        lang=tesseract_lang,
        config="--oem 3 --psm 6",
    ).strip()
    return fallback_text


def _normalize_extracted_text(text: str) -> str:
    cleaned = text.replace("\n", " ")
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    cleaned = re.sub(r"\s+([,.;:!?])", r"\1", cleaned)
    cleaned = re.sub(r"([\(\[\{])\s+", r"\1", cleaned)
    cleaned = re.sub(r"\s+([\)\]\}])", r"\1", cleaned)
    return cleaned


def extract_text_from_image(image_path: str, source_language: str) -> dict:
    _configure_tesseract()

    with Image.open(image_path) as image:
        loaded_image = image.convert("RGB")

    tesseract_lang = _get_tesseract_lang(source_language)
    ocr_lang = tesseract_lang if tesseract_lang == "eng" else f"{tesseract_lang}+eng"

    try:
        extracted_text = _extract_best_text(loaded_image, ocr_lang).strip()
    except pytesseract.TesseractNotFoundError as error:
        raise ValueError(
            "Tesseract OCR is not configured. Install Tesseract and set TESSERACT_CMD in backend/.env if needed."
        ) from error

    except pytesseract.TesseractError:
        try:
            extracted_text = _extract_best_text(loaded_image, "eng").strip()
            source_language = "English"
        except pytesseract.TesseractError as error:
            raise ValueError(
                f"OCR language data for '{source_language}' is missing in Tesseract installation."
            ) from error

    extracted_text = _normalize_extracted_text(extracted_text)

    if not extracted_text:
        raise ValueError("No readable text found in the image.")

    return {
        "extracted_text": extracted_text,
        "source_language": source_language,
    }


def image_to_text_translation(image_path: str, source_language: str, target_language: str) -> dict:
    extraction_result = extract_text_from_image(image_path, source_language)
    extracted_text = extraction_result["extracted_text"]
    translation_source_language = extraction_result["source_language"]

    translated_text = translate_text(
        text=extracted_text,
        source_language=translation_source_language,
        target_language=target_language,
    )

    return {
        "extracted_text": extracted_text,
        "translated_text": translated_text,
    }
