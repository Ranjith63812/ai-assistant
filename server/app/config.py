import json
import os
from pathlib import Path

CONFIG_PATH = Path(__file__).parent.parent.parent / "config.json"

class Config:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Config, cls).__new__(cls)
            cls._instance._load_config()
        return cls._instance

    def _load_config(self):
        try:
            with open(CONFIG_PATH, "r") as f:
                self._data = json.load(f)
        except FileNotFoundError:
            # Fallback defaults
            self._data = {"provider": "local", "model": "mistral"}
            print(f"Warning: Config file not found at {CONFIG_PATH}, using defaults.")

    @property
    def provider(self):
        return self._data.get("provider", "local")

    @property
    def model(self):
        return self._data.get("model", "mistral")

config = Config()
