# ---------- build ----------
FROM node:20-bullseye-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- runtime ----------
FROM nginx:1.25-alpine

ARG TARGET_ENV=dev

# nginx 설정 분기
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.${TARGET_ENV}.conf /etc/nginx/conf.d/default.conf

# 빌드 결과
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
