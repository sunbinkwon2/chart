import { ChartData, ChartImage } from '@/types/types'
import { readFile, writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { ChartNotFoundError } from '@/errors/error'
import { gzip, gunzip } from 'zlib';
import { promisify } from 'util';
import { logger } from '@/infra/logger'

const gzipAsync = promisify(gzip);
const gunzipAsync = promisify(gunzip);

const USE_GZIP = process.env.USE_GZIP !== 'false';

export interface ChartRepository {
  getData(chartId: string): Promise<ChartData>;
  getImage(chartId: string): Promise<ChartImage>;
}

export class FsChartRepository implements ChartRepository {
  private readonly baseDir: string;

  constructor() {
    this.baseDir = process.env.CHART_DATA_DIR!;
    if (!this.baseDir) {
      throw new Error('CHART_DATA_DIR is not defined');
    }
  }

  // --------------------
  // helpers
  // --------------------

  private dataFileName() {
    return USE_GZIP ? 'data.json.gz' : 'data.json';
  }

  private imageFileName() {
    return USE_GZIP ? 'image.png.gz' : 'image.png';
  }

  // --------------------
  // READ
  // --------------------

  async getData(chartId: string): Promise<ChartData> {
    const filePath = path.join(this.baseDir, chartId, this.dataFileName());

    try {
      const file = await readFile(filePath);

      if (!USE_GZIP) {
        return JSON.parse(file.toString('utf-8'));
      }

      const json = await gunzipAsync(file);
      return JSON.parse(json.toString('utf-8'));
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        throw new ChartNotFoundError(chartId);
      }
      throw err;
    }
  }

  async getImage(chartId: string): Promise<ChartImage> {
    const filePath = path.join(this.baseDir, chartId, this.imageFileName());

    try {
      const file = await readFile(filePath);

      if (!USE_GZIP) {
        return { dataUrl: `data:image/png;base64,${file.toString('base64')}` };
      }

      const buffer = await gunzipAsync(file);
      return { dataUrl: `data:image/png;base64,${buffer.toString('base64')}` };
    } catch (err: any) {
      if (err?.code === 'ENOENT') {
        throw new ChartNotFoundError(chartId);
      }
      throw err;
    }
  }

  // --------------------
  // WRITE
  // --------------------

  async saveData(chartId: string, data: ChartData) {
    const chartDir = path.join(this.baseDir, chartId);
    await mkdir(chartDir, { recursive: true });

    const json = JSON.stringify(data, null, 2);

    if (!USE_GZIP) {
      await writeFile(
        path.join(chartDir, this.dataFileName()),
        json
      );
      return;
    }

    const compressed = await gzipAsync(json);
    await writeFile(
      path.join(chartDir, this.dataFileName()),
      compressed
    );
  }

  async saveImage(chartId: string, pngBuffer: Buffer) {
    const chartDir = path.join(this.baseDir, chartId);
    await mkdir(chartDir, { recursive: true });

    if (!USE_GZIP) {
      await writeFile(
        path.join(chartDir, this.imageFileName()),
        pngBuffer
      );
      return;
    }

    const compressed = await gzipAsync(pngBuffer);
    await writeFile(
      path.join(chartDir, this.imageFileName()),
      compressed
    );
  }

  async saveChart(chartId: string, data: ChartData, pngBuffer: Buffer) {
    await this.saveData(chartId, data);
    await this.saveImage(chartId, pngBuffer);
  }
}
