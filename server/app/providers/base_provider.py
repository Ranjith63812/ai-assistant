from abc import ABC, abstractmethod

class BaseProvider(ABC):
    @abstractmethod
    def send_prompt(self, message: str) -> str:
        """
        Sends a prompt to the model provider and returns the response.
        """
        pass
