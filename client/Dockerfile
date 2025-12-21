# ---------- build ----------
FROM node:20-bullseye-slim AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
ARG TARGET_ENV=dev
RUN npm run build:${TARGET_ENV}

# ---------- runtime ----------
FROM nginx:1.25-alpine

ARG TARGET_ENV=dev
ENV TARGET_ENV=${TARGET_ENV}

# nginx 설정 분기
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.${TARGET_ENV}.conf /etc/nginx/conf.d/default.conf

# 빌드 결과
COPY --from=build /app/dist /usr/share/nginx/html

ENV NODE_ENV=${TARGET_ENV}

EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
