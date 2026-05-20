import express from 'express';
import { pinoHttp } from 'pino-http';

import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { errorHandler } from './middleware/error.js';
import { authRouter } from './routes/auth.js';
import { productRouter } from './routes/product.js';
import { logger } from './utils/logger.js';

const app = express();

app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/auth', authRouter);
app.use('/products', productRouter);

app.use(errorHandler);

try {
  await connectDB();

  app.listen(env.PORT, () =>
    logger.info(`Backend running on port ${env.PORT}`),
  );
} catch (error) {
  logger.error({ err: error }, 'Failed to start application');
  process.exit(1);
}
