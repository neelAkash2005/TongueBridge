from pathlib import Path
import logging

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse

from app.schemas.document_translation import DocumentTranslateResponse
from app.services.document_service import translate_document

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/translate/document", response_model=DocumentTranslateResponse)
async def translate_document_route(
    file: UploadFile = File(...),
    source_lang: str = Form(...),
    target_lang: str = Form(...),
) -> DocumentTranslateResponse:
    try:
        result = await translate_document(file, source_lang, target_lang)
        return DocumentTranslateResponse(**result)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Document translation error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Document translation failed: {str(e)}")


@router.get("/download/{filename}")
async def download_file(filename: str):
    try:
        file_path = Path("temp_docs") / filename
        if not file_path.exists() or not file_path.is_file():
            raise HTTPException(status_code=404, detail="Translated file not found.")
        return FileResponse(path=file_path, filename=filename)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Download error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Download failed: {str(e)}")
