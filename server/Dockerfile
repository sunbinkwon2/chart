FROM lcjs-server-base:1.0.0

WORKDIR /app

COPY . .

RUN npm run build

EXPOSE 8080

CMD xvfb-run -s "-ac -screen 0 1280x720x24" node dist/index.js