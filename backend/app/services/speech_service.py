import speech_recognition as sr


def speech_to_text(file_path: str) -> str:
    recognizer = sr.Recognizer()

    with sr.AudioFile(file_path) as source:
        audio_data = recognizer.record(source)

    recognized_text = recognizer.recognize_google(audio_data)
    return recognized_text
