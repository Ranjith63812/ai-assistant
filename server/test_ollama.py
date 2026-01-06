import requests
import json

url = "http://127.0.0.1:11434/api/generate"
payload = {
    "model": "mistral:latest",
    "prompt": "Hello",
    "stream": False
}

print(f"Testing connection to {url} with model: {payload['model']}")

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        print("Success!")
        print(response.json().get("response"))
    else:
        print("Error Response:")
        print(response.text)
except Exception as e:
    print(f"Exception: {e}")
