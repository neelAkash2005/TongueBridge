import os
import tempfile

from fastapi import APIRouter, BackgroundTasks, File, Form, HTTPException, UploadFile
from fastapi.concurrency import run_in_threadpool
from fastapi.responses import FileResponse

from app.schemas.speech import SpeechToTextResponse
from app.services.speech_service import speech_to_text, text_to_speech


router = APIRouter()


@router.post("/translate/speech-to-text", response_model=SpeechToTextResponse)
async def translate_speech_to_text(file: UploadFile = File(...)) -> SpeechToTextResponse:
    temp_file_path = ""

    try:
        file_extension = os.path.splitext(file.filename or "")[1]

        with tempfile.NamedTemporaryFile(delete=False, suffix=file_extension) as temp_file:
            temp_file.write(await file.read())
            temp_file_path = temp_file.name

        recognized_text = await run_in_threadpool(speech_to_text, temp_file_path)
        return SpeechToTextResponse(recognized_text=recognized_text)
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=400, detail=f"Could not process audio file: {error}") from error
    finally:
        await file.close()
        if temp_file_path and os.path.exists(temp_file_path):
            os.remove(temp_file_path)


@router.post("/translate/text-to-speech")
async def translate_text_to_speech(
    background_tasks: BackgroundTasks,
    text: str = Form(...),
):
    try:
        audio_file_path = await run_in_threadpool(text_to_speech, text)
        background_tasks.add_task(os.remove, audio_file_path)

        return FileResponse(
            audio_file_path,
            media_type="audio/mpeg",
            filename="translated_speech.mp3",
        )
    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:
        raise HTTPException(status_code=500, detail=f"Could not generate speech: {error}") from error
