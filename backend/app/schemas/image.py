from pydantic import BaseModel


class ImageExtractionResponse(BaseModel):
    extracted_text: str


class ImageTranslationResponse(BaseModel):
    extracted_text: str
    translated_text: str
