import rateLimit from 'express-rate-limit';

import { HttpStatus } from '../utils/http.js';

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  message: {
    error: 'Too many login attempts from this IP, please try again after 15 minutes',
  },
  statusCode: HttpStatus.TOO_MANY_REQUESTS,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
});
