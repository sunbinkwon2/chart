import winston from 'winston';
import path from 'path';

const logDir = 'logs'; // 로그 저장 폴더

const logger = winston.createLogger({
  level: 'info', // 기본 로그 레벨
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // 콘솔 로그
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') }),
  ],
});

// 개발 환경에서 콘솔에 색상 추가
if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    })
  );
}

export default logger;
