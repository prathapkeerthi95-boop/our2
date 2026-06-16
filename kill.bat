@echo off
echo.
echo    Stopping Agency Website Servers...
echo    ========================================
echo.

echo [*] Killing processes on port 3001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3001') do taskkill /PID %%a /F 2>nul
echo [+] Port 3001 cleared.

echo.
echo [*] Killing processes on port 5001...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5001') do taskkill /PID %%a /F 2>nul
echo [+] Port 5001 cleared.

echo.
echo [*] Killing any remaining Node.js processes...
taskkill /F /IM node.exe 2>nul
echo [+] Node.js processes terminated.

echo.
echo    ========================================
echo    [+] All servers stopped successfully!
echo    ========================================
echo.
pause
