import express from 'express';

import { env } from './config/env.js'

const app = express();

app.listen(env.PORT, () =>
  console.log(`Backend running on port ${env.PORT}`),
);