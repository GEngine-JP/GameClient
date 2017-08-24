rem 1.EXEDIR
rem 2.Source Dir
rem 3.Outdir

echo Start Trans...

set Path=%1
 for /f "delims=" %%i in ('dir /b  %2 "proto/*.proto"') do %Path% -i:%2/%%i -o:%3/%%~ni.cs
pause

