import os
import tempfile

from fastapi import APIRouter, HTTPException, UploadFile

from app.schemas.speech import SpeechToTextResponse
from app.services.speech_service import speech_to_text


router = APIRouter()


@router.post("/translate/speech-to-text", response_model=SpeechToTextResponse)
async def translate_speech_to_text(file: UploadFile) -> SpeechToTextResponse:
    temp_file_path = ""

    try:
        file_extension = os.path.splitext(file.filename or "")[1]

        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        recognized_text = speech_to_text(temp_file_path)
        return SpeechToTextResponse(recognized_text=recognized_text)
    except Exception as error:
        raise HTTPException(status_code=400, detail=f"Could not process audio file: {error}") from error
    finally:
        await file.close()
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)
