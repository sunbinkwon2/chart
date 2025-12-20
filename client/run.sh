#!/bin/sh
set -e

IMAGE_NAME=lcjs-client
DOCKERFILE=Dockerfile

echo "🚀 Docker image build start..."
docker build -f $DOCKERFILE -t $IMAGE_NAME .

echo "✅ Docker image build complete: $IMAGE_NAME"
