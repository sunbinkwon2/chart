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

echo "🟢 Building Docker images for environment: $ENV"
echo "   Using environment file: $ENV_FILE"

# -----------------------------
# 1️⃣ nginx 이미지 빌드
# -----------------------------
echo "🚀 Building nginx image..."
docker build -t lcjs-nginx -f ./nginx/Dockerfile.nginx --build-arg NGINX_CONF=${NGINX_CONF} ./nginx
echo "✅ nginx image build complete: lcjs-nginx"

# -----------------------------
# 2️⃣ lcjs-server 이미지 빌드
# -----------------------------
echo "🚀 Building lcjs-server image..."
docker build -t $LCJS_SERVER_IMAGE ./server
echo "✅ lcjs-server image build complete: $LCJS_SERVER_IMAGE"

# -----------------------------
# 3️⃣ lcjs-client 이미지 빌드
# -----------------------------
echo "🚀 Building lcjs-client image..."
docker build -t $LCJS_CLIENT_IMAGE ./client
echo "✅ lcjs-client image build complete: $LCJS_CLIENT_IMAGE"



echo "🎉 All images built successfully!"
