import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('8080'),
  MONGO_URI: z.string(),
});

export const env = envSchema.parse(process.env);
