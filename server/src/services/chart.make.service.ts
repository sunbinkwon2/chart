import { PNG } from 'pngjs'
import { LineChartRequest, ScatterChartRequest, LineChartResponse, ScatterChartResponse } from '@/types/types';
import { db } from '@/repositories/db.repository';
import { logger } from '@/infra/logger'
import { lightningChart, renderToPNG } from '@lightningchart/lcjs-headless'
import { Themes } from '@lightningchart/lcjs'
import { ChartGeneratingError } from '@/errors/error'
import { FsChartRepository } from '@/repositories/chart.repository';
import { randomUUID } from 'crypto';

const chartRepo = new FsChartRepository();

const getBands = () => {
  const bands: {
    x: number
    usl: number
    lsl: number
    ucl: number
    lcl: number
  }[] = []

  let center = 50

  for (let i = 1; i <= 120; i++) {
    // 중심선도 완만한 트렌드
    const trend = i * 0.15

    // 미세 흔들림 (관리선은 안정적이어야 함)
    const drift = (Math.random() - 0.5) * 2 // ±1

    const cl = center + trend + drift

    const usl = cl + 20
    const lsl = cl - 20
    const ucl = cl + 12
    const lcl = cl - 12

    bands.push({
      x: i,
      usl: Number(usl.toFixed(2)),
      lsl: Number(lsl.toFixed(2)),
      ucl: Number(ucl.toFixed(2)),
      lcl: Number(lcl.toFixed(2)),
    })
  }

  return bands
}


const getPoints = () => {
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
    const chartId = req.chartId ?? randomUUID(); // 요청자가 ID를 안보냈으면 서버가 생성
    // const points = getPoints()
    // const bands = getBands()
    const lc = lightningChart()
    const chart = lc.ChartXY({ theme: Themes.darkGold })
      
    chart.addLineSeries()
      .appendJSON(req.points) 

    const chartOutput = renderToPNG(chart, 1920, 1080);
    const chartImage = PNG.sync.write(chartOutput);
    const chartData = {
      ...req
    }
    // ChartRepository 활용하여 저장
    await chartRepo.saveChart(chartId, chartData, chartImage);

    lc.dispose();
    logger.info("Chart PNG sent successfully.");
    return {
      dataUrl: chartImage.toString('base64'),
      options: req.options,
      meta: req.meta,
      type : 'LINE'
    }
  } catch (error) {
    throw new ChartGeneratingError('LightningChart rendering failed');
  }
}

export async function makeScatterChart(req: ScatterChartRequest): Promise<ScatterChartResponse> {
  try{
    const chartId = req.chartId ?? randomUUID(); // 요청자가 ID를 안보냈으면 서버가 생성
    // const points = getPoints()
    // const bands = getBands()
    const lc = lightningChart()
    const chart = lc.ChartXY({ theme: Themes.darkGold })
    chart.addPointSeries()
      .appendJSON(req.points);

    const chartOutput = renderToPNG(chart, 1920, 1080);
    const chartImage = PNG.sync.write(chartOutput);
    const chartData = {
      ...req
    }
    // ChartRepository 활용하여 저장
    await chartRepo.saveChart(chartId, chartData, chartImage);

    lc.dispose();
    logger.info("Chart PNG sent successfully.");
    return {
      dataUrl: chartImage.toString('base64'),
      options: req.options,
      meta: req.meta,
      type: 'SCATTER'
    }
  } catch (error) {
    throw new ChartGeneratingError('LightningChart rendering failed');
  }
}



