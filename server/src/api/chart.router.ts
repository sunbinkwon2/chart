import { Router, Request, Response } from 'express';
import { logger }  from '@/infra/logger'
import { BaseChartRequest, BaseChartResponse, ApiResponse, ChartData, ChartImage } from '@/types/types';
import { FsChartRepository } from '@/repositories/chart.repository'
import { ChartService } from '@/services/chart.service'

const chartService = new ChartService(new FsChartRepository());

const router = Router();

router.post('/chart', async ( req: Request<{}, ApiResponse<BaseChartResponse>, BaseChartRequest>, res) => {
    const result = await chartService.dispatch(req.body);
    res.json({ success: true, result });
  }
);

router.get('/chart/:chartId/data', async (req: Request<{ chartId: string }, ApiResponse<ChartData>>, res) => {
    const result = await chartService.getChartData(req.params.chartId);
    res.json({ success: true, result });
  }
);

router.get('/chart/:chartId/image', async (req: Request<{ chartId: string }, ApiResponse<ChartImage>>, res) => {
  const result =
    await chartService.getChartImage(req.params.chartId);
  res.send({ success: true, result });
});

export default router;
