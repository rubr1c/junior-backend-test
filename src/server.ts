import express from 'express';

import { connectDB } from './config/db.js';
import { env } from './config/env.js';

const app = express();

try {
  await connectDB();

  app.listen(env.PORT, () =>
    console.log(`Backend running on port ${env.PORT}`),
  );
} catch (error) {
  console.error('Failed to start:', error);
  process.exit(1);
}
