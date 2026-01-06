import requests

try:
    response = requests.get('http://127.0.0.1:11434/api/tags')
    if response.status_code == 200:
        print("Available models:")
        for model in response.json()['models']:
            print(f"- {model['name']}")
    else:
        print(f"Error: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Failed to connect: {e}")
