import { PNG } from 'pngjs'
import { LineChartRequest, ScatterChartRequest, LineChartResponse, ScatterChartResponse } from '@/types/types';
import { db } from '@/repositories/db.repository';
import { logger } from '@/infra/logger'
import { lightningChart, renderToPNG } from '@lightningchart/lcjs-headless'
import { Themes } from '@lightningchart/lcjs'
import { ChartGeneratingError } from '@/errors/error'

const LineChartResponseSample = {
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
    marker: 'line+point',
    showChamberStep: true,
    showLegend: true,
    downSample: false
  } as const,
  meta: {
    title: 'title',
    subtitle: 'subtitle',
    legend: 'legend'
  },
  type : 'LINE'
}

const ScatterChartResponseSample = {
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
    showLegend: true,
    downSample: false
  } as const,
  meta: {
    title: 'title',
    subtitle: 'subtitle',
    legend: 'legend'
  },
  type : 'SCATTER'
}


const getDataSet = () => {
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
};

export async function makeLineChart(req: LineChartRequest): Promise<LineChartResponse> {
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
      dataUrl: outputBuff.toString('base64'),
      options: LineChartResponseSample.options,
      meta: LineChartResponseSample.meta,
      type : 'LINE'
    }
  } catch (error) {
    throw new ChartGeneratingError(error.statusCode, 'LightningChart rendering failed');
  }
}

export async function makeScatterChart(req: ScatterChartRequest): Promise<ScatterChartResponse> {
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
      dataUrl: outputBuff.toString('base64'),
      options: ScatterChartResponseSample.options,
      meta: ScatterChartResponseSample.meta,
      type: 'SCATTER'
    }
  } catch (error) {
    throw new ChartGeneratingError(error.statusCode, 'LightningChart rendering failed');
  }
}



