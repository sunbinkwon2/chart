import { LinePoint, ScatterPoint } from './types';
import { db } from './db';
import logger from '@/logger'
import { lightningChart, renderToPNG } from '@lightningchart/lcjs-headless'
import { PNG } from 'pngjs'

export async function handleLine(data: LinePoint[]) {
  try{

    const dataSet = getDataSet()
    const lc = lightningChart()
    const chart = lc.ChartXY({ theme: Themes.darkGold })
      
    chart.addLineSeries()
      .appendJSON(dataSet) // { x: number, y: number }[];

    const chartOutput = renderToPNG(chart, 1920, 1080);
    const outputBuff = PNG.sync.write(chartOutput);

    lc.dispose();
    logger.info("Chart PNG sent successfully.");
    return {
      message: 'Chart server running',
      imageBase64: chartBuffer.toString('base64')
    }
  } catch (error) {
    logger.error("Error generating or sending chart:", error);
  }
}

export async function handleScatter(data: ScatterPoint[]) {
  try{

    const dataSet = getDataSet()
    const lc = lightningChart()
    const chart = lc.ChartXY({ theme: Themes.darkGold })
    const scatterSeries = chart.addPointSeries()
    scatterSeries.appendJSON(this.points);

    const chartOutput = renderToPNG(chart, 1920, 1080);
    const outputBuff = PNG.sync.write(chartOutput);

    lc.dispose();
    logger.info("Chart PNG sent successfully.");
    return {
      message: 'Chart server running',
      imageBase64: chartBuffer.toString('base64')
    }
  } catch (error) {
    logger.error("Error generating or sending chart:", error);
  }
}


const request: ChartRequest = {
  points: [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 }
  ],
  bands: [
    { x: 1, usl: 4, lsl: 2, ucl: 5, lcl: 1 },
    { x: 2, usl: 4, lsl: 2, ucl: 5, lcl: 1 },
    { x: 3, usl: 4, lsl: 2, ucl: 5, lcl: 1 }
  ],
  options: {
    marker: 'point',
    showChamberStep: true,
    showLegend: true
  },
  meta: {
    chartTitle: 'title',
    chartSubTitle: 'chartSubTitle',
    chartLegend: 'chartLegend'
  },
  chartType : 'Line'
}

const getDataSet = (() => {
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



