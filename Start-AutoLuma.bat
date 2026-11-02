@echo off
title AutoLuma Automotive Lighting Platform
color 0B
echo ====================================================================
echo  AUTOLUMA - Automotive Lighting Systems & Compatibility Platform
echo ====================================================================
echo.
echo  Starting local development server on http://localhost:5173/ ...
echo.

REM Automatically open default browser after a brief 1.5 second pause
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:5173"

REM Start Vite dev server
npm.cmd run dev -- --host 127.0.0.1 --port 5173

pause
