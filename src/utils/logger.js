const winston = require('winston');
const { createLogger, format, transports } = winston;
const path = require('path');
require('winston-daily-rotate-file');

// Define log directory paths
const logDir = path.join(process.cwd(), 'logs');

// Define custom log formats
const customFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

const colorizedFormat = format.combine(
  format.colorize(),
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
);

// Create file transports with daily rotation
const errorFileTransport = new transports.DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error'
});

const combinedFileTransport = new transports.DailyRotateFile({
  filename: path.join(logDir, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d'
});

const httpFileTransport = new transports.DailyRotateFile({
  filename: path.join(logDir, 'http-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  level: 'http'
});

// Create Winston loggers
const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: customFormat,
  transports: [
    new transports.Console({ format: colorizedFormat }),
    errorFileTransport,
    combinedFileTransport
  ],
  exitOnError: false
});

const httpLogger = createLogger({
  level: 'http',
  format: customFormat,
  transports: [
    httpFileTransport
  ],
  exitOnError: false
});

// Export different logger functions for different purposes
exports.requestLogger = (req, res, next) => {
  httpLogger.http(
    `${req.method} ${req.originalUrl} - ${req.ip} - ${req.headers['user-agent']}`
  );
  next();
};

exports.errorLogger = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}\n${err.stack}`);
  next(err);
};

exports.logger = logger;