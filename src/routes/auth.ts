import { Router } from 'express';

import { login } from '../controllers/auth.js';
import { loginLimiter } from '../middleware/rateLimit.js';
import { validateRequest } from '../middleware/validate.js';
import { loginRules } from '../validators/auth.js';

export const authRouter = Router();

authRouter.post('/login', loginLimiter, loginRules, validateRequest, login);
