import express from 'express';
import { pinoHttp } from 'pino-http';

import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(pinoHttp({ logger }));

try {
  await connectDB();

  app.listen(env.PORT, () =>
    logger.info(`Backend running on port ${env.PORT}`),
  );
} catch (error) {
  logger.error({ err: error }, 'Failed to start application');
  process.exit(1);
}
