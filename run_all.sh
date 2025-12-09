#!/bin/bash

# Function to kill all child processes when this script exits
cleanup() {
    echo "Stopping all services..."
    kill -- -$$
}

# Trap SIGINT (Ctrl+C) and call cleanup
trap cleanup SIGINT EXIT

echo "------------------------------------------------"
echo "Starting Sanjana Creations E-commerce Stack"
echo "------------------------------------------------"

# 1. Check/Start MongoDB (Optional - assumes 'mongod' is in path or running)
# Uncomment the next line if you need to start mongo manually
# mongod --dbpath /data/db &

# 2. Start Backend
echo "[1/2] Starting Backend Server (Port 5000)..."
node backend/server.js &
BACKEND_PID=$!

# Wait a moment for backend to initialize
sleep 2

# 3. Start Frontend
echo "[2/2] Starting Frontend (Vite)..."
npm run dev &
FRONTEND_PID=$!

echo "------------------------------------------------"
echo "Application is running!"
echo "Backend: http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "------------------------------------------------"
echo "Press Ctrl+C to stop everything."

# Wait for processes to finish
wait
