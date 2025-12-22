import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { initLCJSHeadlessLicense } from './lcjs'
import logger from './logger'
import 'express-async-errors';
import router from './api'
import { errorMiddleware } from './error.middleware';

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

app.use(express.json());
app.use('/api/v1', router);
app.use(errorMiddleware);

const port = process.env.PORT;

app.listen(port, () => {
  logger.info(`🚀 [${env}] Chart server running on ${port}`);
});



