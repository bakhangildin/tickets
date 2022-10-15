#!/bin/zsh
PID_FILE="gunicorn.pid"

if [ -f $PID_FILE ]
then
    kill -9 `cat $PID_FILE`
    rm $PID_FILE
    print -P "%F{red}\n\tServer stopped\n%f"
fi