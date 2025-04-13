const { prisma } = require('../models');

/**
 * Execute a database transaction
 * @param {Function} callback - Function to execute within the transaction. It receives the transaction object.
 * @returns {Promise<any>} - The result of the transaction
 */
exports.executeTransaction = async (callback) => {
  return await prisma.$transaction(async (tx) => {
    return await callback(tx);
  });
};

/**
 * Execute multiple operations in a single transaction
 * @param {Array<Object>} operations - Array of operations to perform
 * @param {string} operations[].model - The Prisma model to use (e.g., 'user', 'category')
 * @param {string} operations[].action - The action to perform ('create', 'update', 'delete')
 * @param {Object} operations[].data - The data for the operation
 * @param {Object} [operations[].where] - The where clause for update/delete operations
 * @returns {Promise<Array<any>>} - Array of results from each operation
 */
exports.executeOperations = async (operations) => {
  return await prisma.$transaction(async (tx) => {
    const results = [];
    
    for (const op of operations) {
      const { model, action, data, where = {} } = op;
      
      if (!prisma[model]) {
        throw new Error(`Invalid model: ${model}`);
      }
      
      let result;
      
      switch (action) {
        case 'create':
          result = await tx[model].create({ data });
          break;
        case 'update':
          result = await tx[model].update({ where, data });
          break;
        case 'delete':
          result = await tx[model].delete({ where });
          break;
        case 'createMany':
          result = await tx[model].createMany({ data, skipDuplicates: true });
          break;
        default:
          throw new Error(`Invalid action: ${action}`);
      }
      
      results.push(result);
    }
    
    return results;
  });
};