@echo off
echo Installing root dependencies...
call npm install

echo Installing API dependencies...
cd api
call npm install
cd ..

echo Installing UI dependencies...
cd ui
call npm install
cd ..

echo Starting development server...
call npm run dev
