#!/bin/sh
set -e

IMAGE_NAME=lcjs-client
CONTAINER_NAME=lcjs-client
HOST_PORT=3000
CONTAINER_PORT=80

echo "🧹 Remove existing container (if exists)..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "🚀 Docker container run start..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $HOST_PORT:$CONTAINER_PORT \
  $IMAGE_NAME

echo "✅ Docker container is running!"
echo "🌐 http://localhost:$HOST_PORT"
