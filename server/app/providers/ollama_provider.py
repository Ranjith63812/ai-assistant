import requests
from .base_provider import BaseProvider
from ..config import config

class OllamaProvider(BaseProvider):
    def __init__(self):
        self.base_url = "http://127.0.0.1:11434/api/generate"
        self.model = config.model

    def send_prompt(self, message: str) -> str:
        payload = {
            "model": self.model,
            "prompt": message,
            "stream": False
        }
        try:
            response = requests.post(self.base_url, json=payload)
            response.raise_for_status()
            data = response.json()
            return data.get("response", "")
        except requests.exceptions.RequestException as e:
            return f"Error communicating with Ollama: {str(e)}"
