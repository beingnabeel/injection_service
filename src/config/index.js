require('dotenv').config();

// Configuration object with environment variable defaults
const config = {
  // Environment
  env: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',

  // Server
  port: process.env.PORT || 3001, // Use a different port than service_offering
  host: process.env.HOST || 'localhost',

  // CORS
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:8085',

  // Database - these should be the same as service_offering to use the same DB
  database: {
    url: process.env.DATABASE_URL,
  },

  // Auth
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key', // Should be same as service_offering
    expiresIn: process.env.JWT_EXPIRES_IN || '90d',
  },

  // Logs
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  // Queue
  queue: {
    url: process.env.RABBITMQ_URI || 'amqp://localhost',
    retryAttempts: parseInt(process.env.QUEUE_RETRY_ATTEMPTS || '5', 10),
    retryDelay: parseInt(process.env.QUEUE_RETRY_DELAY || '5000', 10),
  },

  // API Rate Limits
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10), // 1 minute
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // 100 requests per windowMs
  },
};

// Validate essential configuration
function validateConfig() {
  const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar],
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(', ')}`,
    );
  }

  return true;
}

// Only validate in production to make development easier
if (config.isProd) {
  validateConfig();
}

module.exports = config;
