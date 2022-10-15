#!/bin/zsh

BIND="0.0.0.0:8000"
PID_FILE="gunicorn.pid"

. env/bin/activate

gunicorn -w 4 -b $BIND --reload -p $PID_FILE -D app:app
sleep 1
print -P "%F{green}\n\tServer started at $BIND, pid=`cat $PID_FILE`\n%f"

deactivate