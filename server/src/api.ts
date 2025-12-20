import { Router } from 'express';
import { dispatch } from './dispatcher';
import { ChartRequest } from './types';

const router = Router();

router.post('/chart', async (req, res) => {
  try {
    const body = req.body as ChartRequest;
    const result = await dispatch(body);
    res.json({ success: true, result });
  } catch (e: any) {
    res.status(400).json({ success: false, message: e.message });
  }
});

export default router;
