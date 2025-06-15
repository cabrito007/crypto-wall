#!/bin/bash

# Run script for Crypto Wall Docker container
set -e

echo "🚀 Starting Crypto Wall container..."

# Stop and remove existing container if it exists
docker stop crypto-wall-app 2>/dev/null || true
docker rm crypto-wall-app 2>/dev/null || true

# Run the container
docker run -d \
  --name crypto-wall-app \
  -p 3000:80 \
  --restart unless-stopped \
  crypto-wall:latest

echo "✅ Crypto Wall is now running!"
echo "🌐 Open your browser and go to: http://localhost:3000"
echo "📊 Your crypto dashboard is ready!"

# Show container status
docker ps | grep crypto-wall