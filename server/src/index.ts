import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import 'express-async-errors';
import router from '@/api/chart.router'
import { errorMiddleware } from '@/middlewares/runTimeError.middleware';
import { notFoundMiddleware } from '@/middlewares/notFoundError.middleware';
import { logger } from '@/infra/logger'
import { initLCJSHeadlessLicense } from '@/infra/lcjs'
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

// 서버 부팅 시 딱 한 번
initLCJSHeadlessLicense()

const env = process.env.NODE_ENV || 'local';
const containerName = process.env.CONTAINER_NAME || process.env.HOSTNAME || 'unknown';

let envPath: string;

switch (env) {
  case 'local':
    envPath = path.resolve(__dirname, '../env/.env.local');
    break;
  case 'dev':
    envPath = path.resolve(__dirname, '../env/.env.dev');
    break;
  case 'prod':
    envPath = path.resolve(__dirname, '../env/.env.prod');
    break;
  default:
    envPath = path.resolve(__dirname, '../env/.env.local');
}

dotenv.config({ path: envPath });
logger.info('Loaded env file:', envPath);

const app = express();

// 1. security & parsing
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// 2. logging
app.use(morgan('combined'));

// 3. routes
app.use('/api/v1', router);

// 4. health
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

// 5. 404
app.use(notFoundMiddleware);

// 6. error
app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`🚀 [${env}] Chart server running on ${port}`);
});



