#!/bin/sh
set -e

# -----------------------------
# 환경 변수 설정
# -----------------------------
IMAGE_NAME=lcjs-client            # 사용할 Docker 이미지 이름
CONTAINER_NAME=lcjs-client   # 컨테이너 이름
HOST_PORT=3000                    # 호스트에서 열 포트
ENV=${1:-dev}                     # 환경: 기본 dev, prod는 ./deploy-client.sh prod
ENV_FILE="./env/.env.${ENV}"      # 해당 환경의 .env 파일 경로

# -----------------------------
# 환경 파일 존재 확인
# -----------------------------
if [ ! -f "$ENV_FILE" ]; then
  echo "❌ 환경 파일이 존재하지 않습니다: $ENV_FILE"
  exit 1
fi

echo "🟢 Deploying lcjs-client in '$ENV' environment"
echo "   Using environment file: $ENV_FILE"
echo "   Container name: $CONTAINER_NAME"
echo "   Host port: $HOST_PORT -> Container port 80"

# -----------------------------
# 기존 컨테이너 제거
# -----------------------------
echo "🛑 Stopping and removing existing container (if exists)..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

# -----------------------------
# 새 컨테이너 실행
# -----------------------------
echo "🚀 Starting new container..."
docker run -d \
  --name $CONTAINER_NAME \
  -p $HOST_PORT:80 \
  --restart unless-stopped \
  --env-file $ENV_FILE \
  $IMAGE_NAME

# -----------------------------
# 완료 로그
# -----------------------------
echo "✅ lcjs-client container is running!"
echo "🌐 Access your client at: http://localhost:$HOST_PORT"
