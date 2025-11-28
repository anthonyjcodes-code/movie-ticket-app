@echo off
echo Starting MovieStore Application...
echo.

echo Starting Backend Server...
cd "C:\Users\rsant\Music\ticket booking app\MovieStore\server"
start "Backend Server" cmd /k "npm run dev"

echo Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo Starting Frontend Server...
cd "C:\Users\rsant\Music\ticket booking app\MovieStore\client"
start "Frontend Server" cmd /k "npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul