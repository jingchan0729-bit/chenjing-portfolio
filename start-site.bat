@echo off
chcp 65001 >nul
set "NODE_DIR=C:\Users\q\.workbuddy\binaries\node\versions\22.22.2-6"
cd /d "%~dp0"

if not exist "dist\index.html" (
  echo [1/2] Building...
  call "%NODE_DIR%\npm.cmd" run build
  if errorlevel 1 goto fail
)

echo [2/2] Starting preview server...
echo Site:  http://localhost:4173
echo Press Ctrl+C in this window to stop.
start "" http://localhost:4173
call "%NODE_DIR%\npm.cmd" run preview -- --port 4173
goto end

:fail
echo Build failed. See errors above.

:end
pause
