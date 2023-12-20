@echo off
echo 👨 No we enter in developer mode 
timeout /t 2 /nobreak > NUL

echo First we check if we are in the latest version of the project
git pull

timeout /t 2 /nobreak > NUL

echo We set the environment variable
set NODE_ENV=development

timeout /t 2 /nobreak > NUL

echo We are done 🎉, exiting  

exit /b 0