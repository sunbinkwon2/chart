# Local 클라이언트 환경 
cd ./client
npm run local

# Local 서버 환경 
cd ./server
npm run local

# Dev 환경 이미지 빌드
./build.sh dev

# Prod 환경 이미지 빌드
./build.sh prod

# Dev 환경 배포
./deploy.sh dev

# Prod 환경 배포
./deploy.sh prod

# Dev 환경 중지
./stop.sh dev

# Prod 환경 중지
./stop.sh prod