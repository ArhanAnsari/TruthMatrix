@echo off
REM TruthMatrix - Quick Start Script for Windows
REM This script sets up everything you need to run TruthMatrix locally

echo.
echo 🎯 TruthMatrix - Fake News ^& Deepfake Detector
echo ================================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo.

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed!
    pause
    exit /b 1
)

echo ✅ npm found:
npm --version
echo.

REM Setup Gemini API Key
echo 🔑 Setting up Gemini API Key
echo Get your free API key at: https://aistudio.google.com/app/apikey
echo.
set /p GEMINI_KEY="Enter your Gemini API Key: "

if "%GEMINI_KEY%"=="" (
    echo ❌ API Key cannot be empty!
    pause
    exit /b 1
)

REM Create .env.local file
echo GEMINI_API_KEY=%GEMINI_KEY% > .env.local
echo ✅ Created .env.local file
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

REM Build the project
echo 🔨 Building Next.js project...
call npm run build

if errorlevel 1 (
    echo ❌ Build failed
    pause
    exit /b 1
)

echo ✅ Build successful
echo.

REM Done
echo 🎉 Setup complete!
echo.
echo Available commands:
echo   npm run dev     - Start development server
echo   npm run build   - Build for production
echo   npm run start   - Start production server
echo   npm run lint    - Run linter
echo.
echo To start developing, run:
echo   npm run dev
echo.
echo Then visit: http://localhost:3000
echo.
pause
