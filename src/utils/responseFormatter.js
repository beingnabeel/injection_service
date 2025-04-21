/**
 * Standardized success response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Success message
 * @param {*} data - Response data
 */
exports.sendSuccess = (
  res,
  statusCode = 200,
  message = 'Success',
  data = {},
) => {
  res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};

/**
 * Standardized error response
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 */
exports.sendError = (res, statusCode = 500, message = 'Server Error') => {
  res.status(statusCode).json({
    status: 'error',
    message,
  });
};

/**
 * Standardized created response (201)
 * @param {Object} res - Express response object
 * @param {string} message - Success message
 * @param {*} data - Created resource data
 */
exports.sendCreated = (
  res,
  message = 'Resource created successfully',
  data = {},
) => {
  exports.sendSuccess(res, 201, message, data);
};

/**
 * Standardized no content response (204)
 * @param {Object} res - Express response object
 */
exports.sendNoContent = (res) => {
  res.status(204).end();
};
