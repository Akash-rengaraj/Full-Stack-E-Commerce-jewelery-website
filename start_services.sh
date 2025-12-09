#!/bin/bash

# Create database directory if it doesn't exist
mkdir -p database

# Start MongoDB locally (using cached binary)
# echo "Starting MongoDB..."
# MONGOD_PATH="/home/johan/.cache/mongodb-binaries/mongod-x64-kali-7.0.14"
# 
# if [ -f "$MONGOD_PATH" ]; then
#     $MONGOD_PATH --dbpath ./database --bind_ip 127.0.0.1 --port 27017 --logpath ./database/mongo.log --fork
# else
#     echo "MongoDB binary not found at $MONGOD_PATH"
#     echo "Checking for alternative..."
#     MONGOD_PATH="/home/johan/.cache/mongodb-binaries/mongod-x64-kali-7.0.24"
#     if [ -f "$MONGOD_PATH" ]; then
#         $MONGOD_PATH --dbpath ./database --bind_ip 127.0.0.1 --port 27017 --logpath ./database/mongo.log --fork
#     else
#         echo "No MongoDB binary found. Please ensure it was downloaded."
#         # exit 1
#     fi
# fi

# Wait for MongoDB to start
# sleep 2

# Start Backend
echo "Starting Backend..."
cd backend
npm install # Ensure dependencies are installed
# Kill any existing node server on port 5000
pkill -f "node server.js" || true
nohup node server.js > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started with PID $BACKEND_PID"
cd ..

# Start Frontend
echo "Starting Frontend..."
npm run dev
