#!/bin/sh

ENV=${1:-dev}   # 기본 dev 환경
ENV_FILE="./env/.env.${ENV}"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Environment file $ENV_FILE not found!"
  exit 1
fi

echo "🟢 Deploying ${ENV} environment using $ENV_FILE..."

# Stop and remove old containers
docker-compose --env-file $ENV_FILE down

# Start new containers in detached mode
docker-compose --env-file $ENV_FILE up -d --build

echo "✅ Deployment completed!"
echo "🖥 Access via http://localhost:$(grep NGNIX_PORT $ENV_FILE | cut -d '=' -f2)"
