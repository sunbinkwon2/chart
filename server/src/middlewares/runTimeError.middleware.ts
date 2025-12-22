// error.middleware.ts
import { logger } from '@/infra/logger';
import { Request, Response, NextFunction } from 'express';
import { AppError, ChartNotFoundError, ChartGeneratingError } from '@/errors/error';

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error(err);

  if (err instanceof AppError) {
    return res.json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ChartNotFoundError) {
    return res.json({
      success: false,
      message: err.message,
    });
  }

  if (err instanceof ChartGeneratingError){
    return res.json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}
