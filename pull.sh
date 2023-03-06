#!/usr/bin/bash

cd /home/honestpropertiesuk/dev/api

git pull origin main
if  pm2 restart 0 --update-env; then
    echo "Restart Successfully"
else
    pm2 start /home/honestpropertiesuk/dev/api/bin/www  --update-env
    echo "Started Successfully"
fi
