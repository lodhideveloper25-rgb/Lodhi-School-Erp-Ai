@echo off
REM Starts backend and frontend dev servers in separate command windows

echo Starting backend in a new window...
start "Backend" cmd /k "cd /d %~dp0backend && npm install && npm run dev"

timeout /t 2 >nul

echo Starting frontend in a new window...
start "Frontend" cmd /k "cd /d %~dp0frontend && npm install && npm run dev"

echo Launched backend and frontend. Close these windows to stop servers.
