@echo off

cd %0\..\

ECHO.
ECHO *** Installing back end modules ***
ECHO.

ECHO installing emailjs...
call npm install emailjs

ECHO installing ws...
call npm install ws

ECHO installing open...
call npm install open

ECHO.
ECHO *** Installing front end modules ***
ECHO.

ECHO Installing angular
call npm install angular

ECHO.
ECHO *** Starting program ***
ECHO.
call node server.js