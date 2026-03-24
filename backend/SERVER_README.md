# Backend Server Setup & Running

## Quick Start

### Option 1: Without Hot Reload (Recommended for Windows)
```bash
cd backend
python start_server.py
```

This starts the server at `http://127.0.0.1:8000`

### Option 2: With Manual Reload
```bash
cd backend
uvicorn app.main:app --host 127.0.0.1 --port 8000
```

When you make code changes, restart the server manually with Ctrl+C and run the command again.

### Option 3: With Auto Reload (PowerShell)
```powershell
cd backend
python run_server.py
```

## Troubleshooting

### If you see "ModuleNotFoundError" when the server starts:
1. Make sure your virtual environment is activated: `.\.venv\Scripts\Activate.ps1`
2. Install dependencies: `pip install -r requirements.txt`
3. Start the server

### If you get subprocess errors with --reload on Windows:
- Use Option 1 or Option 2 instead
- The subprocess environment on Windows sometimes doesn't propagate all dependencies correctly
- We've implemented lazy imports to minimize this, but disabling reload is the safest approach

## Features

- Document Translation (PDF, DOCX, TXT, PPT, PPTX, DOC files)
- Text Translation with M2M100 Model
- Image to Text (OCR with Tesseract)
- Audio to Text (Speech Recognition)
- Support for: English, Hindi, Bengali, Spanish, French

## API Endpoints

- `POST /translate/text` - Translate text
- `POST /translate/image` - Extract and translate text from images
- `POST /translate/document` - Extract and translate text from documents
- `GET /download/{filename}` - Download translated document

## Notes

All document processing packages are now using **lazy imports**, which means they're only loaded when needed. This prevents module errors during initialization when running with Python subprocesses (like uvicorn's reload feature on Windows).
