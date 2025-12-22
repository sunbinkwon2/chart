import { ChartData, ChartImage } from '@/types/types'
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { ChartNotFoundError } from '@/errors/error'

// repositories/repository.ts
export interface ChartRepository {
  getData(chartId: string): Promise<ChartData>;
  getImage(chartId: string): Promise<ChartImage>;
}

export class FsChartRepository implements ChartRepository {
  private readonly baseDir: string;

  constructor() {
    this.baseDir = process.env.CHART_DATA_DIR;
    if (!this.baseDir) {
      throw new Error('CHART_DATA_DIR is not defined');
    }
  }
//ChartNotFoundError
  async getData(chartId: string) {
    const filePath = path.join(this.baseDir, chartId, 'data.json');
    try {
      const json = await readFile(filePath, 'utf-8');
      return JSON.parse(json);
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        throw new ChartNotFoundError(chartId);
      }
      throw err;
    }
  }

  async getImage(chartId: string) {
    const filePath = path.join(this.baseDir, chartId, 'image.png');

    try {
      const base64 = await readFile(filePath, 'base64');
      return {
        dataUrl: base64,
      };
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        throw new ChartNotFoundError(chartId);
      }
      throw err;
    }
  }

  async saveData(chartId: string, data: any) {
    const chartDir = path.join(this.baseDir, chartId);
    await mkdir(chartDir, { recursive: true });
    await writeFile(path.join(chartDir, 'data.json'), JSON.stringify(data, null, 2));
  }

  async saveImage(chartId: string, pngBuffer: Buffer) {
    const chartDir = path.join(this.baseDir, chartId);
    await mkdir(chartDir, { recursive: true });
    await writeFile(path.join(chartDir, 'image.png'), pngBuffer);
  }

  async saveChart(chartId: string, data: any, pngBuffer: Buffer) {
    await this.saveData(chartId, data);
    await this.saveImage(chartId, pngBuffer);
  }
}
