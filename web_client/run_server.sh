
PORT=3000

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

npm run dev -- -H 0.0.0.0