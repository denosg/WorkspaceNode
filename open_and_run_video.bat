@echo off

rem TODO: SET THE VIDEO NUMBER HERE
set "videoNumber=11"

rem TODO: SET VIDEO FOLDER NUMBER HERE
set "videoFolderNumber=16"

set "folderPath=D:\Cursuri\Node.js Developer Course (3rd Edition)\GetFreeCourses.Co-Udemy-The Complete Node.js Developer Course (3rd Edition)"

rem Construct the video folder filename based on the folder number
set "videoFolderPath="
for /f "delims=" %%a in ('dir /b /ad "%folderPath%" ^| findstr /r /c:"^%videoFolderNumber%\." 2^>nul') do (
    set "videoFolderPath=%%a"
)

if not defined videoFolderPath (
    echo Video folder path with number %videoFolderNumber% not found.
) else (
    rem Open the specified folder

    echo videoFolderPath=%videoFolderPath%
    echo folderPath=%folderPath%

    set "videoPath=%folderPath%\%videoFolderPath%"
    start "" "%videoPath%"
    
    rem Pause for a moment to ensure the folder is open before launching the video
    timeout /t 2 /nobreak >nul

    rem Construct the video filename based on the video number
    set "videoFileName="
    for /f "delims=" %%a in ('dir /b /a-d "%videoPath%" ^| findstr /r "^%videoNumber%\. " 2^>nul') do (
        set "videoFileName=%%a"
    )

    if not defined videoFileName (
        echo Video with number %videoNumber% not found.
    ) else (
        rem Run the video
        start "" "%videoPath%\%videoFileName%"
    )
)
