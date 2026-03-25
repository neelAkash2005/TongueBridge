from transformers import M2M100ForConditionalGeneration, M2M100Tokenizer
from threading import Lock


# Multilingual model (supports many language directions)
MODEL_NAME = "facebook/m2m100_418M"

# Cache to avoid reloading model/tokenizer on every request
model_cache = {}
model_cache_lock = Lock()
translation_lock = Lock()

# Supported app language names/codes for this project
LANGUAGE_CODE_MAP = {
    "english": "en",
    "hindi": "hi",
    "bengali": "bn",
    "spanish": "es",
    "french": "fr",
    "en": "en",
    "hi": "hi",
    "bn": "bn",
    "es": "es",
    "fr": "fr",
}


def _get_language_code(language_name: str) -> str:
    """Convert language name to language code."""
    lang_lower = language_name.lower().strip()
    if lang_lower not in LANGUAGE_CODE_MAP:
        raise ValueError(
            f"Language '{language_name}' not recognized. "
            f"Supported: English, Hindi, Bengali, Spanish, French"
        )
    return LANGUAGE_CODE_MAP[lang_lower]


def _get_translator():
    """Get multilingual tokenizer and model from cache or load them."""
    if MODEL_NAME in model_cache:
        return model_cache[MODEL_NAME]

    with model_cache_lock:
        if MODEL_NAME not in model_cache:
            tokenizer = M2M100Tokenizer.from_pretrained(MODEL_NAME)
            model = M2M100ForConditionalGeneration.from_pretrained(MODEL_NAME)
            model_cache[MODEL_NAME] = (tokenizer, model)
    return model_cache[MODEL_NAME]


def translate_text_service(
    text: str,
    source_language: str,
    target_language: str,
) -> str:
    """
    Translate text using Hugging Face transformers.
    """
    if not text or not text.strip():
        return ""

    # Get language codes
    src_code = _get_language_code(source_language)
    tgt_code = _get_language_code(target_language)

    if src_code == tgt_code:
        return text

    # Get tokenizer/model and translate (guarded for thread safety)
    with translation_lock:
        tokenizer, model = _get_translator()
        tokenizer.src_lang = src_code

        inputs = tokenizer(text, return_tensors="pt", truncation=True, max_length=512)
        generated_tokens = model.generate(
            **inputs,
            forced_bos_token_id=tokenizer.get_lang_id(tgt_code),
            max_length=512,
        )
        translated_text = tokenizer.decode(generated_tokens[0], skip_special_tokens=True)

    return translated_text


def translate_text(text: str, source_language: str, target_language: str) -> str:
    return translate_text_service(
        text=text,
        source_language=source_language,
        target_language=target_language,
    )