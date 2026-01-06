from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from .config import config
from .providers.ollama_provider import OllamaProvider
from .providers.cloud_provider import CloudProvider

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

def get_provider():
    if config.provider == "local":
        return OllamaProvider()
    elif config.provider == "cloud":
        return CloudProvider()
    else:
        raise ValueError(f"Unknown provider: {config.provider}")

@app.post("/chat")
async def chat(request: ChatRequest):
    if not request.message:
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    try:
        provider = get_provider()
        response = provider.send_prompt(request.message)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "provider": config.provider, "model": config.model}
