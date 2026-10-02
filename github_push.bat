@echo off
title GitHub Auto Push
echo ==============================================
echo       Automated GitHub Push Script
echo ==============================================
echo.

:: Prompt user for commit message
set /p commit_msg="Enter your commit message (or press Enter for default): "

:: If user just pressed Enter, set a default message
if "%commit_msg%"=="" set commit_msg="Auto update from local"

echo.
echo [1/3] Adding changes...
git add .

echo [2/3] Committing changes...
git commit -m "%commit_msg%"

echo [3/3] Pushing to GitHub (origin main)...
git push origin main

echo.
echo ==============================================
echo       Done! Code pushed to GitHub.
echo ==============================================
pause
