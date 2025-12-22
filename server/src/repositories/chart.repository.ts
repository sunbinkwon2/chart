import { ChartData, ChartImage } from '@/types/types'
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { ChartNotFoundError } from '@/errors/error'

// repositories/repository.ts
export interface ChartRepository {
  getData(id: string): Promise<ChartData>;
  getImage(id: string): Promise<ChartImage>;
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
  async getData(id: string) {
    const filePath = path.join(this.baseDir, id, 'data.json');
    try {
      const json = await readFile(filePath, 'utf-8');
      return JSON.parse(json);
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        throw new ChartNotFoundError(id);
      }
      throw err;
    }
  }

  async getImage(id: string) {
    const filePath = path.join(this.baseDir, id, 'image.png');

    try {
      const base64 = await readFile(filePath, 'base64');
      return {
        dataUrl: base64,
      };
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        throw new ChartNotFoundError(id);
      }
      throw err;
    }
  }
}
