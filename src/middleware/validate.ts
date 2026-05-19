import type { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { HttpStatus } from '../utils/http.js';

export function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      errors: errors.array(),
    });
    return;
  }

  next();
}
