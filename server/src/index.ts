import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { lightningChart, renderToPNG } from '@lightningchart/lcjs-headless'
import { Themes } from '@lightningchart/lcjs'
import { PNG } from 'pngjs'
import { initLCJSHeadlessLicense } from './lcjs'

// 서버 부팅 시 딱 한 번
initLCJSHeadlessLicense()

const env = process.env.NODE_ENV || 'local';
let envPath: string;

switch (env) {
  case 'local':
    envPath = path.resolve(__dirname, '../env/.env.local');
    break;
  case 'dev':
    envPath = path.resolve(__dirname, '../env/.env.dev');
    break;
  case 'prod':
    envPath = path.resolve(__dirname, '../env/.env.prod');
    break;
  default:
    envPath = path.resolve(__dirname, '../env/.env.local');
}

dotenv.config({ path: envPath });
console.log('Loaded env file:', envPath);

const containerName = process.env.CONTAINER_NAME || process.env.HOSTNAME || 'unknown';

const app = express();
app.use(express.json());

// ===============================
// 환경별 catch-all 응답
// ===============================

const port = process.env.PORT;

const generateChartPNG = () => {
    // 이후부터는 그냥 사용
    const lc = lightningChart()

    const dataSet = (() => {
      const result: { x: number; y: number }[] = [];

      let y = 50; // 시작값

      for (let i = 1; i <= 120; i++) {
        // 큰 변동폭 노이즈
        const noise = (Math.random() - 0.5) * 20; // ±10

        // 완만한 상승 추세
        const trend = i * 0.15;

        // 가끔 터지는 스파이크
        const spike =
          Math.random() < 0.08
            ? (Math.random() - 0.5) * 60 // ±30
            : 0;

        y = Math.max(5, y + noise + spike);

        result.push({
          x: i,
          y: Number((y + trend).toFixed(2)),
        });
      }

      return result;
    })();


    const chart = lc.ChartXY({ theme: Themes.darkGold })
    
    chart.addLineSeries()
      .appendJSON(dataSet) // { x: number, y: number }[];


    const chartOutput = renderToPNG(chart, 1920, 1080);
    const outputBuff = PNG.sync.write(chartOutput);

    lc.dispose();
    return outputBuff;
};

app.get("/chart-json", (req, res) => {
    try {
        const chartBuffer = generateChartPNG();
        // Content-Type을 image/png로 설정
        res.status(200).json({
          containerName,
          env,
          message: 'Chart server running',
          path: req.originalUrl,
          contentType: 'image/png',
          imageBase64: chartBuffer.toString('base64')
        })
        console.log("Chart PNG sent successfully.");
    } catch (error) {
        console.error("Error generating or sending chart:", error);
        res.status(500).send("Error generating chart image.");
    }
});

// /chart 경로로 GET 요청이 오면 PNG 차트 반환
app.get("/chart-png", (req, res) => {
    try {
        const chartBuffer = generateChartPNG();
        // Content-Type을 image/png로 설정
        res.set("Content-Type", "image/png");

        // Buffer 데이터를 응답으로 전송
        res.send(chartBuffer);
        // 또는 res.end(chartBuffer, 'binary'); 를 사용할 수도 있습니다.
        
        console.log("Chart PNG sent successfully.");
    } catch (error) {
        console.error("Error generating or sending chart:", error);
        res.status(500).send("Error generating chart image.");
    }
});


app.listen(port, () => {
  console.log(`🚀 [${env}] Chart server running on ${port}`);
});



