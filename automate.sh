#!/usr/bin/env bash

cd C:\Users\YATHARTH\projects

git add .

DATE=$(date)

git commit -m "changes made on $DATE"

git push -u origin master

osascript -e 'display notificaton "pushed to remote" with title "SUCCESS"'