FROM node:20-bullseye-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build


# ---------- production stage ----------
FROM nginx:1.25-alpine

# 기본 nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 nginx 설정
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드 결과 복사
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
