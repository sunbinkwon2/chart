#!/bin/sh
set -e

# -----------------------------
# 환경 설정
# -----------------------------
LCJS_IMAGE_NAME=lcjs-server
NGINX_IMAGE_NAME=lcjs-nginx
ENV=${1:-dev}   # 기본 dev 환경
ENV_FILE="./env/.env.${ENV}"

if [ ! -f "$ENV_FILE" ]; then
  echo "❌ Environment file $ENV_FILE not found!"
  exit 1
fi

# 환경변수 로드
export $(grep -v '^#' $ENV_FILE | xargs)

# -----------------------------
# lcjs-server 이미지 빌드
# -----------------------------
echo "🚀 Building lcjs-server image..."
docker build -t $LCJS_IMAGE_NAME .

echo "✅ lcjs-server image build complete: $LCJS_IMAGE_NAME"

# -----------------------------
# nginx 이미지 빌드
# -----------------------------
echo "🚀 Building nginx image for ${ENV} environment..."

docker build -t $NGINX_IMAGE_NAME -f Dockerfile.nginx --build-arg NGINX_CONF=${NGINX_CONF} .

echo "✅ nginx image build complete: $NGINX_IMAGE_NAME"
