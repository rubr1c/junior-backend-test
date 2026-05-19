import type { NextFunction, Request, Response } from 'express';

import type { UserRole } from '../models/user.js';
import { AppError } from '../utils/error.js';
import { HttpStatus } from '../utils/http.js';
import { jwt, type JwtPayload } from '../utils/jwt.js';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export async function requireAuth(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'Unauthorized');
    }

    const payload = await jwt.verify(token);

    if (!payload) {
      throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid or expired token');
    }

    req.user = payload;
    next();
  } catch (error) {
    next(error);
  }
}

export function requireRole(role: UserRole) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      return next(new AppError(HttpStatus.FORBIDDEN, 'Access denied'));
    }

    next();
  };
}