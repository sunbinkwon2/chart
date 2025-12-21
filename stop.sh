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
# 기존 컨테이너 제거
# -----------------------------
echo "🛑 Stopping and removing existing containers..."
docker-compose --env-file $ENV_FILE down

# -----------------------------
# 완료 로그
# -----------------------------
echo "✅ Stop completed!"
