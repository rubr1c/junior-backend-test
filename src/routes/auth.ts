import { Router } from 'express';

import { login } from '../controllers/auth.js';
import { validateRequest } from '../middleware/validate.js';
import { loginRules } from '../validators/auth.js';

export const authRouter = Router();

authRouter.post('/login', loginRules, validateRequest, login);
