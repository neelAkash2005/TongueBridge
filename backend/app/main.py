from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.translation import router as translation_router
from app.routes.speech import router as speech_router
from app.routes.image import router as image_router


app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(translation_router)
app.include_router(speech_router)
app.include_router(image_router)


@app.get("/")
def root() -> dict:
    return {"message": "TongueBridge backend running"}


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}
