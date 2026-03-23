import os
import tempfile

from gtts import gTTS
import speech_recognition as sr


def speech_to_text(file_path: str) -> str:
    recognizer = sr.Recognizer()

    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)

    recognized_text = recognizer.recognize_google(audio_data)
    return recognized_text


def text_to_speech(text: str) -> str:
    if not text or not text.strip():
        raise ValueError("Text is required for text-to-speech.")

    tts = gTTS(text=text, lang="en")

    with tempfile.NamedTemporaryFile(delete=False, suffix=".mp3") as temp_file:
        output_file_path = temp_file.name

    tts.save(output_file_path)

    if not os.path.exists(output_file_path):
        raise ValueError("Could not generate speech audio.")

    return output_file_path
