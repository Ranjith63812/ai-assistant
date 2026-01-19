@echo off
setlocal
echo ==========================================
echo      AI Assistant - One-Time Setup
echo ==========================================

echo.
echo [1/4] Checking prerequisites...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Python is not installed. Please install Python 3.8+ and try again.
    pause
    exit /b
)
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Node.js is not installed. Please install Node.js v18+ and try again.
    pause
    exit /b
)

echo.
echo [2/4] Installing Backend (Python)...
cd server
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
echo Installing dependencies (this may take a minute)...
python -m pip install --upgrade pip
pip install -r requirements.txt
if %errorlevel% neq 0 (
   echo Failed to install Python dependencies.
   pause
   exit /b
)
cd ..

echo.
echo [3/4] Installing Frontend (React)...
cd client
if not exist node_modules (
    echo Installing npm packages (this may take a few minutes)...
    call npm install
    if %errorlevel% neq 0 (
        echo Failed to install npm dependencies.
        pause
        exit /b
    )
) else (
    echo Node modules already exist. Skipping install.
)
cd ..

echo.
echo [4/4] Checking Local AI (Ollama)...
where ollama >nul 2>&1
if %errorlevel% neq 0 (
    echo Ollama not found. Attempting to auto-install via Winget...
    winget install Ollama.Ollama
    if %errorlevel% neq 0 (
         echo.
         echo [!] Could not auto-install Ollama.
         echo Please download it manually from: https://ollama.com
         pause
         exit /b
    )
    echo Ollama installed!
    echo NOTE: You might need to restart this script if Ollama command isn't found yet.
) else (
    echo Ollama is installed.
)

echo.
echo Starting Ollama service to pull model...
start /min "Ollama Service" cmd /c "ollama serve"
:: Wait a bit for service to start
timeout /t 5 >nul

echo Pulling default model 'qwen:0.5b' (this downloads ~400MB)...
call ollama pull qwen:0.5b

echo.
echo ==========================================
echo        SETUP COMPLETE!
echo ==========================================
echo You can now run 'start_app.bat' to launch the assistant.
pause
