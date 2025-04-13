/**
 * Wrapper function to catch errors in async functions
 * Eliminates the need for try-catch blocks in controller functions
 * @param {Function} fn - Async function to execute
 * @returns {Function} Express middleware function
 */
module.exports = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};