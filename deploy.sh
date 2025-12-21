#!/bin/sh
set -e

# -----------------------------
# 환경 선택
# -----------------------------
ENV=${1:-dev}  # 기본 dev 환경
ENV_FILE=".env.${ENV}"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Environment file not found: $ENV_FILE"
  exit 1
fi

# -----------------------------
# 환경 변수 로드
# -----------------------------
export $(grep -v '^#' $ENV_FILE | xargs)

echo "🟢 Deploying environment: $ENV"
echo "   Using environment file: $ENV_FILE"
echo "   Nginx port: $NGINX_PORT"
echo "   Client port: $CLIENT_PORT"

# -----------------------------
# 기존 컨테이너 제거
# -----------------------------
echo "🛑 Stopping and removing existing containers..."
docker-compose --env-file $ENV_FILE down

# -----------------------------
# 새 컨테이너 실행
# -----------------------------
echo "🚀 Starting containers..."
docker-compose --env-file $ENV_FILE up -d --build

# -----------------------------
# 완료 로그
# -----------------------------
echo "✅ Deployment completed!"
echo "🌐 Client: http://localhost:$CLIENT_PORT"
echo "⚡ Server cluster behind nginx at port $NGINX_PORT"
