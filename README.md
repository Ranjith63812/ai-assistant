# MCP AI Chat Client

A simple, layered AI chat client architecture with a Python/FastAPI backend and a React/Vite frontend.

## Architecture

- **Frontend**: React + Vite (Port 5173 default)
- **Backend**: Python + FastAPI (Port 8000)
- **Model Provider**: Ollama (Mistral) or Cloud (Stub)

## Prerequisites

1.  **Node.js**: Installed.
2.  **Python**: 3.8+ installed.
3.  **Ollama**: Installed and running (`ollama serve`).
    - Pull the model: `ollama pull qwen:0.5b` (Lightweight, good for low RAM) or `ollama pull mistral` (Requires 4GB+ RAM)

## Setup & Run

### 1. Backend (Python)

Open a terminal in the root folder:

```bash
cd server
python -m venv venv
# Windows
.\venv\Scripts\activate
# Mac/Linux
# source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload
```

The server will start at `http://localhost:8000`.

### 2. Frontend (React)

Open a **new** terminal in the root folder:

```bash
cd client
npm install
npm run dev
```

Open your browser to the URL shown (usually `http://localhost:5173`).

## Configuration

Edit `config.json` in the root directory to switch providers:

```json
{
  "provider": "local",  // or "cloud"
  "model": "qwen:0.5b"
}
```
