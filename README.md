# TongueBridge

Real-time voice-to-voice and multi-format translation web application.

## Project Structure

- `frontend/` — React + Vite web client
- `backend/` — FastAPI service for text, image, speech, and document translation

## Features

- Text translation
- Image-to-text extraction and translation (OCR)
- Speech translation
- Document translation (PDF, DOCX, TXT, PPT, PPTX, DOC)
- Download translated documents via API

## Prerequisites

- Python 3.10+ (recommended)
- Node.js 18+ and npm
- Tesseract OCR installed (for image/document OCR flows)

## Setup

From project root:

### 1) Create and activate virtual environment (Windows PowerShell)

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 2) Install backend dependencies

```powershell
cd backend
pip install -r requirements.txt
cd ..
```

### 3) Install frontend dependencies

```powershell
cd frontend
npm install
cd ..
```

## Run the Application

Use two terminals.

### Terminal 1: Backend

```powershell
cd backend
python run_server.py
```

Backend URL: `http://127.0.0.1:8000`

Optional auto-reload mode:

```powershell
cd backend
python run_server.py --reload
```

### Terminal 2: Frontend

```powershell
cd frontend
npm run dev
```

Frontend URL (default Vite): `http://localhost:5173`

## Backend API Endpoints

- `POST /translate/text`
- `POST /translate/image`
- `POST /translate/document`
- `GET /download/{filename}`

## Frontend Commands

```powershell
cd frontend
npm run dev
npm run build
npm run preview
npm run lint
```

## Troubleshooting

- If you see `ModuleNotFoundError`, ensure root `.venv` is activated and dependencies are installed.
- If Windows reload causes subprocess issues, run backend without `--reload`.
- Document processing dependencies are loaded lazily to reduce startup import failures.
