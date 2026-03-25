from pydantic import BaseModel


class SpeechToTextResponse(BaseModel):
    recognized_text: str
