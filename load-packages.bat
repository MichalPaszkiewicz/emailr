@echo off

cd %0\..\

ECHO.
ECHO *** Installing back end modules ***
ECHO.

ECHO installing emailjs...
call npm install emailjs

ECHO.
ECHO *** Installing front end modules ***
ECHO.

ECHO Installing angular
call npm install angular

ECHO.
ECHO *** Starting program ***
ECHO.
call node server.js
start index.html
ECHO opening in browser...
ECHO.

pause