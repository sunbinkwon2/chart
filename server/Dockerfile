FROM node:20-bullseye-slim

# ===============================
# System dependencies
# (LightningChart + OpenGL + Xvfb)
# ===============================
RUN apt-get update && apt-get install -y \
    python3 \
    build-essential \
    mesa-common-dev \
    libgl1-mesa-dev \
    libglu1-mesa-dev \
    libgl1-mesa-glx \
    libx11-dev \
    libxi-dev \
    libxext-dev \
    pkg-config \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libglew-dev \
    xvfb \
    xauth \
    mesa-utils \
    libglu1-mesa \
    libgl1-mesa-dri \
    libxi6 \
    libxrandr2 \
    libxinerama1 \
    libxcursor1 \
    libx11-xcb1 \
    --no-install-recommends && \
    ln -s /usr/bin/python3 /usr/bin/python && \
    rm -rf /var/lib/apt/lists/*

# ===============================
# App setup
# ===============================
WORKDIR /app

# package files 먼저 (캐시 최적화)
COPY package*.json ./
RUN npm install

# 소스 복사
COPY . .

# TypeScript build
RUN npm run build

# ===============================
# Runtime
# ===============================
ENV NODE_ENV=production
ENV DISPLAY=:99

EXPOSE 8080

CMD ["xvfb-run", "-s", "-ac -screen 0 1280x720x24", "node", "dist/index.js"]