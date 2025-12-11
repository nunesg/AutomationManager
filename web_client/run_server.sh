
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

IP_ADDR=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "localhost")

echo "NEXT_PUBLIC_BACKEND_URL=http://$IP_ADDR:$PORT" > frontend/.env.local

npm run dev -- -H $IP_ADDR