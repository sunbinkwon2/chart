// dispatcher.ts
import { BaseChartRequest, BaseChartResponse } from '@/types/types';
import { makeLineChart, makeScatterChart } from '@/services/chart.make.service';
import { AppError } from '@/errors/error';
import { ChartRepository } from '@/repositories/chart.repository'

// services/chart.service.ts
export class ChartService {
  constructor(private repo: ChartRepository) {}

  async dispatch(req: BaseChartRequest): Promise<BaseChartResponse>{
    switch (req.type) {
      case 'LINE':
        return makeLineChart(req);
      case 'SCATTER':
        return makeScatterChart(req);
      default:
        throw new AppError(400, `Unsupported chart type: ${req.type}`);
    }
  }

  async getChartData(chartId: string) {
    return this.repo.getData(chartId);
  }

  async getChartImage(chartId: string) {
    return this.repo.getImage(chartId);
  }
}
