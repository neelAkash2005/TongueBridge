from pydantic import BaseModel


class DocumentTranslateResponse(BaseModel):
    filename: str
    extracted_text: str  # Full extracted text from document
    translated_text: str  # Full translated text
    download_url: str
