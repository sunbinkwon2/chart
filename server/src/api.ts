// api.ts
import { dispatch } from './dispatcher';
import logger from './logger'
import { Router, Request, Response } from 'express';
import { ChartRequest, ChartResponse, ApiResponse } from './types';

const router = Router();
const env = process.env.NODE_ENV || 'local';
const containerName = process.env.CONTAINER_NAME || process.env.HOSTNAME || 'unknown';

router.post('/chart', async ( req: Request<{}, ApiResponse<ChartResponse>, ChartRequest>, res) => {
    const result = await dispatch(req.body);
    res.json({ success: true, result });
  }
);
router.post('/chart/data', async ( req: Request<{}, ApiResponse<{ data: unknown }>, any>, res) => {
    const result = await dispatch(req.body);
    res.json({ success: true, result });
  }
);

router.post('/chart/image', async (req: Request<{}, ApiResponse<{ image: string }>, any>, res) => {
    const result = await dispatch(req.body);
    res.json({ success: true, result });
  }
);

export default router;
