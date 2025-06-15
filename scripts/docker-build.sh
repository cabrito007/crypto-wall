#!/bin/bash

# Build script for Crypto Wall Docker image
set -e

echo "🐳 Building Crypto Wall Docker image..."

# Build the Docker image
docker build -t crypto-wall:latest .

echo "✅ Docker image built successfully!"
echo "🚀 To run the container, use:"
echo "   docker run -p 3000:80 crypto-wall:latest"
echo "   or"
echo "   docker-compose up"