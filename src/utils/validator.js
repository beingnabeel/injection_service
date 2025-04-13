/**
 * Utility functions for validating input data
 */

/**
 * Check if value is a valid string
 * @param {any} value - Value to check
 * @returns {boolean} - True if valid string
 */
exports.isValidString = (value) => {
  return typeof value === 'string' && value.trim().length > 0;
};

/**
 * Check if value is a valid number
 * @param {any} value - Value to check
 * @returns {boolean} - True if valid number
 */
exports.isValidNumber = (value) => {
  return !isNaN(Number(value));
};

/**
 * Check if value is a valid UUID
 * @param {string} value - Value to check
 * @returns {boolean} - True if valid UUID
 */
exports.isValidUUID = (value) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
};

/**
 * Check if value is a valid email
 * @param {string} value - Value to check
 * @returns {boolean} - True if valid email
 */
exports.isValidEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

/**
 * Check if value is a valid object
 * @param {any} value - Value to check
 * @returns {boolean} - True if valid object
 */
exports.isValidObject = (value) => {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
};

/**
 * Check if value is a valid array
 * @param {any} value - Value to check
 * @returns {boolean} - True if valid array
 */
exports.isValidArray = (value) => {
  return Array.isArray(value);
};

/**
 * Sanitize a string
 * @param {string} value - String to sanitize
 * @returns {string} - Sanitized string
 */
exports.sanitizeString = (value) => {
  if (!exports.isValidString(value)) return '';
  // Remove HTML tags, script tags, etc.
  return value.replace(/<[^>]*>?/gm, '');
};