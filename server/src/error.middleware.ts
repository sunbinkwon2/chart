// error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import logger from '@/logger';
import { AppError } from '@/errors/app-error';

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
  });
}
