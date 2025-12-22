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

router.get('/chart/:id/data', async (req: Request<{ id: string }, ApiResponse<ChartData>>, res) => {
    const result = await chartService.getChartData(req.params.id);
    res.json({ success: true, result });
  }
);

router.get('/chart/:id/image', async (req: Request<{ id: string }, ApiResponse<ChartImage>>, res) => {
  const result =
    await chartService.getChartImage(req.params.id);
  res.send({ success: true, result });
});

export default router;
