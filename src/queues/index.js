const amqp = require('amqplib');
const { logger } = require('../utils/logger');

// RabbitMQ connection URI from environment variables
const rabbitMQ_URI = process.env.RABBITMQ_URI || 'amqp://localhost';

// Queue names for different operations
const QUEUES = {
  WRITE_OPERATIONS: 'write_operations',
  BULK_OPERATIONS: 'bulk_operations',
};

// Initialize connection and channel
let connection = null;
let channel = null;

/**
 * Initialize RabbitMQ connection and channels
 */
async function initializeRabbitMQ() {
  try {
    connection = await amqp.connect(rabbitMQ_URI);
    channel = await connection.createChannel();

    // Assert queues to ensure they exist
    await channel.assertQueue(QUEUES.WRITE_OPERATIONS, { durable: true });
    await channel.assertQueue(QUEUES.BULK_OPERATIONS, { durable: true });

    // Configure prefetch to not overwhelm the worker
    await channel.prefetch(1);

    logger.info('RabbitMQ connection established successfully');

    // Handle connection closure
    connection.on('close', () => {
      logger.error(
        'RabbitMQ connection closed unexpectedly, attempting to reconnect...',
      );
      setTimeout(initializeRabbitMQ, 5000);
    });

    return { connection, channel };
  } catch (error) {
    logger.error(`Error connecting to RabbitMQ: ${error.message}`);
    setTimeout(initializeRabbitMQ, 5000);
    throw error;
  }
}

/**
 * Get the RabbitMQ channel
 * @returns {Promise<Object>} - RabbitMQ channel
 */
async function getChannel() {
  if (!channel) {
    await initializeRabbitMQ();
  }
  return channel;
}

/**
 * Gracefully close RabbitMQ connection
 */
async function closeConnection() {
  if (channel) {
    await channel.close();
  }
  if (connection) {
    await connection.close();
  }
  logger.info('RabbitMQ connection closed');
}

// Handle application shutdown
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeConnection();
  process.exit(0);
});

module.exports = {
  initializeRabbitMQ,
  getChannel,
  closeConnection,
  QUEUES,
};
