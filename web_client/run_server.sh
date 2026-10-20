#!/bin/bash

PORT=3000

# 1. Kill any existing process running on the port safely
PIDS=$(lsof -t -i :"$PORT")
if [ -n "$PIDS" ]; then
  for PID in $PIDS; do
    echo "Process with PID $PID running on port $PORT. Killing PID $PID..."
    kill -9 "$PID"
  done
else
  echo "No process found running on port $PORT. Launching server..."
fi
# 3. Get local IP address securely (defaults to localhost if offline)
IP_ADDR=$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || echo "localhost")

echo "NEXT_PUBLIC_BACKEND_URL=http://$IP_ADDR:$PORT" > ./.env.local
export NEXT_PUBLIC_LOCAL_IP="$IP_ADDR"

echo "Starting Next.js on http://$IP_ADDR:$PORT..."

# 4. Run Next.js directly via npx to avoid npm argument-passing hangups
npx next dev -H "$IP_ADDR" -p "$PORT"
