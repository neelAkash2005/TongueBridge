from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import logging
import traceback
from app.routes.translation import router as translation_router
from app.routes.speech import router as speech_router
from app.routes.image import router as image_router
from app.routes.document_translation import router as document_translation_router

# Setup logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5174",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Global exception handler to prevent server crashes
@app.middleware("http")
async def exception_middleware(request: Request, call_next):
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        logger.error(f"Unhandled exception: {e}")
        logger.error(traceback.format_exc())
        return JSONResponse(
            status_code=500,
            content={"detail": f"Internal server error: {str(e)}"}
        )


app.include_router(translation_router)
app.include_router(speech_router)
app.include_router(image_router)
app.include_router(document_translation_router)


@app.get("/")
def root() -> dict:
    return {"message": "TongueBridge backend running"}


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}

@app.get("/health")
def health_check() -> dict:
    """Health check endpoint to verify server is running."""
    return {"status": "healthy"}
