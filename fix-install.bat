@echo off
REM Fix TruthMatrix - Clean install with Vercel AI SDK

echo.
echo 🔧 Fixing TruthMatrix Installation
echo ====================================
echo.

echo 1. Removing old node_modules...
if exist node_modules (
    rmdir /s /q node_modules
    echo   ✓ Removed
) else (
    echo   ✓ Already clean
)

echo.
echo 2. Clearing npm cache...
call npm cache clean --force
echo   ✓ Cache cleared

echo.
echo 3. Installing fresh dependencies with Vercel AI SDK...
call npm install
if errorlevel 1 (
    echo ❌ Installation failed
    pause
    exit /b 1
)
echo   ✓ Dependencies installed

echo.
echo 4. Done! Ready to go!
echo.
echo Next steps:
echo   npm run dev
echo   Visit: http://localhost:3000
echo.
pause
