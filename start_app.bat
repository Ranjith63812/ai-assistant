@echo off
echo Starting AI Assistant...

:: Start Backend
start "AI Backend" cmd /k "cd server && call venv\Scripts\activate && python -m uvicorn app.main:app --reload"

:: Start Frontend
start "AI Frontend" cmd /k "cd client && npm run dev"

echo Done! Backend running on port 8000, Frontend on port 5173.
