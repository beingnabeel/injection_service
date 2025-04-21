const { logger } = require('../utils/logger');
const AppError = require('../utils/appError');

/**
 * Middleware to log HTTP requests
 */
exports.logRequest = (req, res, next) => {
  logger.info(
    `${req.method} ${req.originalUrl} - ${req.ip} - ${req.headers['user-agent']}`,
  );
  next();
};

/**
 * Middleware to log request performance
 */
exports.logPerformance = (req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.debug(
      `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`,
    );
  });
  next();
};

/**
 * Middleware to log errors
 */
exports.logError = (err, req, res, next) => {
  logger.error(
    `${err.name}: ${err.message} - ${req.method} ${req.originalUrl} - ${req.ip}`,
  );
  logger.error(err.stack);
  next(err);
};
