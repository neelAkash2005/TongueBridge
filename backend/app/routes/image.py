import os
import tempfile

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool

from app.schemas.image import ImageExtractionResponse, ImageTranslationResponse
from app.services.image_service import extract_text_from_image, image_to_text_translation


router = APIRouter()


@router.post("/translate/image/extract", response_model=ImageExtractionResponse)
async def extract_image_text(
    image: UploadFile = File(...),
    source_language: str = Form(...),
) -> ImageExtractionResponse:
    temp_file_path = ""

    try:
        file_extension = os.path.splitext(image.filename or "")[1]

        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            temp_file.write(await image.read())
            temp_file_path = temp_file.name

        result = await run_in_threadpool(
            extract_text_from_image,
            temp_file_path,
            source_language,
        )
        return ImageExtractionResponse(extracted_text=result["extracted_text"])
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Image text extraction failed: {error}") from error
    finally:
        await image.close()
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)


@router.post("/translate/image", response_model=ImageTranslationResponse)
async def translate_image(
    image: UploadFile = File(...),
    source_language: str = Form(...),
    target_language: str = Form(...),
) -> ImageTranslationResponse:
    temp_file_path = ""

    try:
        file_extension = os.path.splitext(image.filename or "")[1]

        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            temp_file.write(await image.read())
            temp_file_path = temp_file.name

        result = await run_in_threadpool(
            image_to_text_translation,
            temp_file_path,
            source_language,
            target_language,
        )
        return ImageTranslationResponse(**result)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Image translation failed: {error}") from error
    finally:
        await image.close()
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
