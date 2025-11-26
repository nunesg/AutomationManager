#!/bin/bash

source .venv/bin/activate

PORT=3050

# Check if a port number was provided
if [ -z "$1" ]; then
  echo "Usage: sudo ./run_server.sh <port_number>"
  echo "No port provided, using default 3050"
else
  echo "Using provided port $PORT."
  PORT=$1
fi



# Find PID running on the port
PID=0
PIDS=$(lsof -t -i :"$PORT")
# Kill each PID safely
for PID in $PIDS; do
  echo "Process with PID $PID running on port $PORT"
  echo "Killing PID $PID"
  kill -9 "$PID"
done


if [ -z "$PID" ] || [ "$PID" -eq 0 ]; then
  echo "No process found running on port $PORT. Lanching server..."
fi

fastapi dev server_main.py --port $PORT
echo "Done."

exit 0