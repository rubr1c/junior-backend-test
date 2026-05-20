import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/error.js';
import { HttpStatus } from '../utils/http.js';
import { logger } from '../utils/logger.js';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
): void {
  /**  if an error is thown after the response started streaming
   *   it will try and send another one which will crash the app.
   *   we delegate it to the default error handler to close the
   *   connection safely.
   */
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    err instanceof AppError
      ? err.statusCode
      : HttpStatus.INTERNAL_SERVER_ERROR;

  const message =
    err instanceof AppError ? err.message : 'Something went wrong';

  logger.error({ err }, message);

  res.status(statusCode).json({
    error: message,
  });
}
