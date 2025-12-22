// dispatcher.ts
import { ChartRequest } from './types';
import { handleLine, handleScatter } from './handlers';
import { AppError } from '@/errors/app-error';

export function dispatch(req: ChartRequest): Promise<ChartResponse>{
  switch (req.chartType) {
    case 'LINE':
      return handleLine(req);
    case 'SCATTER':
      return handleScatter(req);
    default:
      throw new AppError(400, `Unsupported chart type: ${req.type}`);
  }
}
