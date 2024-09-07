#!/bin/bash

# Define directories
FRONTEND_DIR="./frontend"
BACKEND_DIR="./backend"
BLOCKCHAIN_DIR="./blockchain"

# Step 1: Install dependencies for all components

echo "Installing backend dependencies..."
cd $BACKEND_DIR
npm install

echo "Installing blockchain dependencies..."
cd ../$BLOCKCHAIN_DIR
npm install

echo "Installing frontend dependencies..."
cd ../$FRONTEND_DIR
npm install

# Step 2: Run Blockchain Deployment (if necessary)

echo "Deploying smart contracts..."
cd ../$BLOCKCHAIN_DIR
npx truffle migrate --network <network_name> # Replace <network_name> with your configured network (e.g., 'development')

# Step 3: Run Backend Server

echo "Starting backend server..."
cd ../$BACKEND_DIR
npm run start &
BACKEND_PID=$!

# Step 4: Run Frontend Server

echo "Starting frontend server..."
cd ../$FRONTEND_DIR
npm start &
FRONTEND_PID=$!

# Step 5: Start IPFS Daemon (optional, if using local IPFS)

echo "Starting IPFS daemon..."
ipfs daemon &
IPFS_PID=$!

# Step 6: Wait for user input to stop the services
echo "System running. Press [CTRL+C] to stop."
trap 'echo "Shutting down..."; kill $BACKEND_PID $FRONTEND_PID $IPFS_PID; exit' INT

wait
