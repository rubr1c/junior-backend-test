import { jwtVerify, SignJWT, type JWTPayload } from 'jose';

import { env } from '../config/env.js';
import type { UserRole } from '../models/user.js';

export interface JwtPayload extends JWTPayload {
  userId: string;
  role: UserRole;
}

const secret = new TextEncoder().encode(env.JWT_SECRET);

export const jwt = {
  sign: async (payload: JwtPayload, exp = '1d'): Promise<string> =>
    new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(exp)
      .sign(secret),

  verify: async (token: string): Promise<JwtPayload | null> => {
    try {
      const { payload } = await jwtVerify<JwtPayload>(token, secret);
      return payload;
    } catch {
      return null;
    }
  },
};
