import { ChartRequest } from './types';
import { handleLine, handleScatter } from './handlers';

export function dispatch(req: ChartRequest) {
  switch (req.type) {
    case 'LINE':
      return handleLine(req.data as any);
    case 'SCATTER':
      return handleScatter(req.data as any);
    default:
      throw new Error('Unsupported chart type');
  }
}
