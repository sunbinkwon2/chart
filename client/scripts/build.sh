#!/bin/sh
set -e

ENV=${1:-dev}   # 기본 dev 환경

IMAGE_NAME=lcjs-client

echo "🚀 Build $ENV image..."
docker build \
  --build-arg TARGET_ENV=$ENV \
  -t $IMAGE_NAME .
