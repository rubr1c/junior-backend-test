import mongoose from 'mongoose';

import { env } from './env.js';

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (error: Error) => {
  console.error('MongoDB connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

export async function connectDB(): Promise<void> {
  await mongoose.connect(env.MONGO_URI);
}
