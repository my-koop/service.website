@echo off
start npm run-script assets-dev-win
call tsc_.bat
set PORT=1337 && start node app
start "My Koop" "http://localhost:8080/"
