#!/bin/sh

IMAGE_NAME=lcjs-server
CONTAINER_NAME=lcjs-server
PORT=8080

echo "🛑 Stop existing container (if exists)..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

echo "🚀 Run new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:8080 \
  --env-file .env \
  $IMAGE_NAME

echo "✅ Container running: http://localhost:$PORT"
