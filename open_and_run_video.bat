@echo off
rem TODO: SET THE VIDEO NUMBER HERE
set "videoNumber=8"

rem TODO: SET THE PATH HERE
set "folderPath=D:\Cursuri\Node.js Developer Course (3rd Edition)\GetFreeCourses.Co-Udemy-The Complete Node.js Developer Course (3rd Edition)\12. API Authentication and Security (Task App)"

rem Open the specified folder
start "" "%folderPath%"

rem Pause for a moment to ensure the folder is open before launching the video
timeout /t 2 /nobreak >nul

rem Construct the video filename based on the video number
set "videoFileName="
for /f "delims=" %%a in ('dir /b /a-d "%folderPath%" ^| findstr /r "^%videoNumber%\. " 2^>nul') do (
    set "videoFileName=%%a"
)

if not defined videoFileName (
    echo Video with number %videoNumber% not found.
) else (
    rem Run the video
    start "" "%folderPath%\%videoFileName%"
)
