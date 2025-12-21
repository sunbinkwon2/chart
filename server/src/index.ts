import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV || 'local';
let envPath: string;

switch (env) {
  case 'local':
    envPath = path.resolve(__dirname, '../env/.env.local');
    break;
  case 'development':
    envPath = path.resolve(__dirname, '../env/.env.dev');
    break;
  case 'production':
    envPath = path.resolve(__dirname, '../env/.env.prod');
    break;
  default:
    envPath = path.resolve(__dirname, '../env/.env.local');
}

dotenv.config({ path: envPath });
console.log('Loaded env file:', envPath);

// ===============================
// env 파일 선택
// ===============================
dotenv.config({
  path: `.env.${env}`,
});

const app = express();
app.use(express.json());

// ===============================
// 환경별 catch-all 응답
// ===============================

app.use('/api/v1/chart', (req, res) => {
  res.json({
    env,
    message: 'Chart server running',
    path: req.originalUrl,
  });
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`🚀 [${env}] Chart server running on ${port}`);
});


// server.js
// const express = require("express");
// const { lightningChart, renderToPNG } = require("@lightningchart/lcjs-headless");
// const { Themes } = require("@lightningchart/lcjs");
// const { PNG } = require("pngjs");
// const fs = require("fs"); // 파일 시스템에 저장할 필요가 없으므로 주석 처리

// const app = express();
// const port = 3000;

// // 차트를 생성하고 PNG Buffer를 반환하는 함수
// const generateChartPNG = () => {
//     // 1. LightningChart 인스턴스 생성 (라이선스 정보는 적절히 변경하세요)
//     const lc = lightningChart({
//         license: "0002-nxW3iCmdrpvnCfG0oMAVqfdQfb0yLgARtzfWYq+P/gXzoLnMF3FPiHhUpj3C4huSD4XqJyc/GgUaDmzoeEVQagq26auL-MEUCIF9JND1rmqlTID+XMswuqX9Vanp5Nx3tUbETBcJR9b/TAiEAne8X7lEAt2f74ib1yYKJvJryFJEJDoCcNJF4wPQdVlM=",
//         licenseInformation: {
//            appTitle: "LightningChart JS Trial",
//            company: "LightningChart Ltd."
//         }
//     });
//     // 2. ChartXY 생성
//     const chart = lc.ChartXY({ theme: Themes.light });

//     // 3. PNG Buffer 생성 (renderToPNG 사용)
//     const chartOutput = renderToPNG(chart, 1920, 1080);
//     const outputBuff = PNG.sync.write(chartOutput);

//     // 4. 차트 리소스 해제
//     lc.dispose(); 
    
//     return outputBuff;
// };

// // /chart 경로로 GET 요청이 오면 PNG 차트 반환
// app.get("/chart", (req, res) => {
//     try {
//         const chartBuffer = generateChartPNG();

//         // Content-Type을 image/png로 설정
//         res.set("Content-Type", "image/png");

//         // Buffer 데이터를 응답으로 전송
//         res.send(chartBuffer);
//         // 또는 res.end(chartBuffer, 'binary'); 를 사용할 수도 있습니다.
        
//         console.log("Chart PNG sent successfully.");
//     } catch (error) {
//         console.error("Error generating or sending chart:", error);
//         res.status(500).send("Error generating chart image.");
//     }
// });

// app.listen(port, () => {
//     console.log(`Server listening at http://localhost:${port}`);
//     console.log(`Access chart at http://localhost:${port}/chart`);
// });