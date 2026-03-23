from fastapi import APIRouter

from app.schemas.translation import TranslationRequest, TranslationResponse
from app.services.translation_service import translate_text_service


router = APIRouter()


@router.post("/translate/text", response_model=TranslationResponse)
def translate_text(request: TranslationRequest) -> TranslationResponse:
	translated_text = translate_text_service(
		text=request.text,
		source_language=request.source_language,
		target_language=request.target_language,
	)
	return TranslationResponse(translated_text=translated_text)
