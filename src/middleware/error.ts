import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/error.js';
import { HttpStatus } from '../utils/http.js';
import { logger } from '../utils/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode =
    err instanceof AppError
      ? err.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;

  const message =
    err instanceof AppError ? err.message : 'Something went wrong';

  logger.error({ err }, message);

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
