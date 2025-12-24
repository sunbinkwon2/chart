// src/middlewares/notFound.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { HttpError } from '@/errors/error';

export const notFoundMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  next(new HttpError(`Not Found: ${req.originalUrl}`));
};