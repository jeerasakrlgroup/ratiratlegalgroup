@echo off
cd /d "%~dp0"
echo Website: http://localhost:8940
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /c:"IPv4"') do for /f "tokens=*" %%b in ("%%a") do echo Home link: http://%%b:8940
echo (close this window to stop)
python -m http.server 8940
pause
