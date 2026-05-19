import mongoose from 'mongoose';

import { env } from './env.js';
import { logger } from '../utils/logger.js';

mongoose.connection.on('connected', () => {
  logger.info('MongoDB connected');
});

mongoose.connection.on('error', (error: Error) => {
  logger.error({ err: error }, 'MongoDB connection error');
});

mongoose.connection.on('disconnected', () => {
  logger.info('MongoDB disconnected');
});

export async function connectDB(): Promise<void> {
  await mongoose.connect(env.MONGO_URI);
}
