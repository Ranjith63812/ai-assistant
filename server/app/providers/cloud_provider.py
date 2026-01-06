from .base_provider import BaseProvider

class CloudProvider(BaseProvider):
    def send_prompt(self, message: str) -> str:
        return "Stub: Cloud provider is not yet implemented. Please check settings."
