#!/bin/sh
set -e

IMAGE_NAME=lcjs-server

echo "🚀 Docker image build start..."
docker build -t $IMAGE_NAME .

echo "✅ Docker image build complete: $IMAGE_NAME"