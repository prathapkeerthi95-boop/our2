@echo off
cls

echo.
echo    ___                                 _       __     __         _ __      
echo   /   ^|  ____ ____  ____  _______  __ ^| ^|     / /__  / /_  _____(_) /____  
echo  / /^| ^| / __ `/ _ \/ __ \/ ___/ / / / ^| ^| /^| / / _ \/ __ \/ ___/ / __/ _ \ 
echo / ___ ^|/ /_/ /  __/ / / / /__/ /_/ /  ^| ^|/ ^|/ /  __/ /_/ (__  ) / /_/  __/ 
echo /_/  ^|_^|\__, /\___/_/ /_/\___/\__, /   ^|__/^|__/\___/_.___/____/_/\__/\___/  
echo        /____/                /____/                                         
echo.
echo              Agency Website Server
echo    ========================================
echo.

echo [*] Starting API Server on port 5001...
start "API Server - Port 5001" cmd /k "cd /d %~dp0api && npm run dev"

echo [*] Starting UI Server on port 3001...
start "UI Server - Port 3001" cmd /k "cd /d %~dp0ui && npm run dev"

echo.
echo    ========================================
echo    [+] API Server starting on port 5001
echo    [+] UI Server starting on port 3001
echo    ========================================
echo.
echo [*] Both servers are launching in separate windows.
echo [*] Close this window or press any key to exit.
echo.
pause
