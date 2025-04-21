const { getChannel, QUEUES } = require('./index');
const { logger } = require('../utils/logger');
const { prisma } = require('../models');
const transactionService = require('../services/transactionService');

/**
 * Process a write operation message
 * @param {Object} message - Message to process
 * @returns {Promise<void>}
 */
async function processWriteOperation(message) {
  try {
    const { operation, data } = message;

    if (!data || !data.model || !data.action) {
      throw new Error('Invalid message format: missing required fields');
    }

    const { model, action, payload, where = {} } = data;

    // Validate model exists in Prisma client
    if (!prisma[model]) {
      throw new Error(`Invalid model: ${model}`);
    }

    let result;

    switch (action) {
      case 'create':
        result = await prisma[model].create({
          data: payload,
        });
        break;
      case 'update':
        result = await prisma[model].update({
          where,
          data: payload,
        });
        break;
      case 'delete':
        result = await prisma[model].delete({
          where,
        });
        break;
      default:
        throw new Error(`Invalid action: ${action}`);
    }

    logger.info(`Successfully processed ${action} operation for ${model}`);
    return result;
  } catch (error) {
    logger.error(`Error processing write operation: ${error.message}`);
    throw error;
  }
}

/**
 * Process a bulk operation message
 * @param {Object} message - Message to process
 * @returns {Promise<void>}
 */
async function processBulkOperation(message) {
  try {
    const { operation, data } = message;

    if (!data || !data.model || !data.action || !Array.isArray(data.payload)) {
      throw new Error('Invalid message format: missing required fields');
    }

    const { model, action, payload } = data;

    // Validate model exists in Prisma client
    if (!prisma[model]) {
      throw new Error(`Invalid model: ${model}`);
    }

    let result;

    if (action === 'createMany') {
      result = await prisma[model].createMany({
        data: payload,
        skipDuplicates: true,
      });
    } else if (action === 'bulkTransaction') {
      result = await transactionService.executeOperations(payload);
    } else {
      throw new Error(`Invalid bulk action: ${action}`);
    }

    logger.info(`Successfully processed bulk ${action} operation for ${model}`);
    return result;
  } catch (error) {
    logger.error(`Error processing bulk operation: ${error.message}`);
    throw error;
  }
}

/**
 * Start consuming messages from a queue
 * @param {string} queueName - Name of the queue to consume from
 * @param {Function} processFunction - Function to process messages
 * @returns {Promise<void>}
 */
async function startConsumer(queueName, processFunction) {
  try {
    const channel = await getChannel();

    channel.consume(queueName, async (msg) => {
      if (!msg) return;

      try {
        const message = JSON.parse(msg.content.toString());
        logger.debug(`Received message from queue ${queueName}`);

        await processFunction(message);

        // Acknowledge message after successful processing
        channel.ack(msg);
      } catch (error) {
        logger.error(
          `Error processing message from queue ${queueName}: ${error.message}`,
        );

        // Reject the message and requeue it
        // Set requeue to false if you don't want to requeue messages that failed processing
        channel.nack(msg, false, false);
      }
    });

    logger.info(`Started consuming messages from queue: ${queueName}`);
  } catch (error) {
    logger.error(
      `Error starting consumer for queue ${queueName}: ${error.message}`,
    );
    throw error;
  }
}

/**
 * Start all queue consumers
 * @returns {Promise<void>}
 */
exports.startConsumers = async () => {
  await startConsumer(QUEUES.WRITE_OPERATIONS, processWriteOperation);
  await startConsumer(QUEUES.BULK_OPERATIONS, processBulkOperation);
  logger.info('All queue consumers started successfully');
};
