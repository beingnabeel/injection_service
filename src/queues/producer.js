const { getChannel, QUEUES } = require('./index');
const { logger } = require('../utils/logger');

/**
 * Publish a message to a queue
 * @param {string} queue - Queue name
 * @param {Object} message - Message to publish
 * @param {Object} options - Additional options for the message
 * @returns {Promise<boolean>} - Whether the message was published successfully
 */
async function publishToQueue(queue, message, options = {}) {
  try {
    const channel = await getChannel();
    const messageBuffer = Buffer.from(JSON.stringify(message));

    const publishOptions = {
      persistent: true, // Message will survive broker restarts
      ...options,
    };

    const result = channel.sendToQueue(queue, messageBuffer, publishOptions);
    logger.debug(`Message published to queue: ${queue}`);

    return result;
  } catch (error) {
    logger.error(
      `Error publishing message to queue ${queue}: ${error.message}`,
    );
    throw error;
  }
}

/**
 * Publish a write operation message
 * @param {Object} data - Write operation data
 * @returns {Promise<boolean>} - Whether the message was published successfully
 */
exports.publishWriteOperation = async (data) => {
  return await publishToQueue(QUEUES.WRITE_OPERATIONS, {
    timestamp: Date.now(),
    operation: 'write',
    data,
  });
};

/**
 * Publish a bulk operation message
 * @param {Object} data - Bulk operation data
 * @returns {Promise<boolean>} - Whether the message was published successfully
 */
exports.publishBulkOperation = async (data) => {
  return await publishToQueue(QUEUES.BULK_OPERATIONS, {
    timestamp: Date.now(),
    operation: 'bulk',
    data,
  });
};
