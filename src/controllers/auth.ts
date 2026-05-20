import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';

import { UserModel } from '../models/user.js';
import { AppError } from '../utils/error.js';
import { HttpStatus } from '../utils/http.js';
import { jwt } from '../utils/jwt.js';

export async function login(req: Request, res: Response): Promise<void> {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username }).select('+password');

  if (!user) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError(HttpStatus.UNAUTHORIZED, 'Invalid username or password');
  }

  const token = await jwt.sign({
    userId: user._id.toString(),
    role: user.role,
  });

  res.status(HttpStatus.OK).json({
    token,
  });
}
