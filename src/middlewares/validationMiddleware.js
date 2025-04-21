const { body, param, validationResult } = require('express-validator');
const AppError = require('../utils/appError');
// const validator = require('../utils/validator');

// Helper function to check for validation errors
const checkValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);
    return next(new AppError(errorMessages[0], 400));
  }
  next();
};

// Validate generic write request
exports.validateWriteRequest = [
  body('model').notEmpty().withMessage('Model name is required'),
  body('data')
    .notEmpty()
    .withMessage('Data is required')
    .isObject()
    .withMessage('Data must be an object'),
  checkValidationErrors,
];

// Validate generic update request
exports.validateUpdateRequest = [
  body('model').notEmpty().withMessage('Model name is required'),
  body('id').notEmpty().withMessage('ID is required'),
  body('data')
    .notEmpty()
    .withMessage('Data is required')
    .isObject()
    .withMessage('Data must be an object'),
  checkValidationErrors,
];

// Validate generic delete request
exports.validateDeleteRequest = [
  body('model').notEmpty().withMessage('Model name is required'),
  body('id').notEmpty().withMessage('ID is required'),
  checkValidationErrors,
];

// Validate bulk write request
exports.validateBulkWriteRequest = [
  body('model').notEmpty().withMessage('Model name is required'),
  body('data')
    .notEmpty()
    .withMessage('Data is required')
    .isArray()
    .withMessage('Data must be an array'),
  checkValidationErrors,
];

// Validate category
exports.validateCategory = [
  body('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  checkValidationErrors,
];
exports.validateCategoryUpdate = [
  // Name validation
  body('name')
    .trim()
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),

  // Description validation (optional)
  body('description')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Description must be between 5 and 255 characters'),

  // Vehicle type validation
  body('vehicleType')
    .optional()
    .isIn(['CAR', 'BIKE'])
    .withMessage('Vehicle type must be one of: CAR, BIKE'),

  // Icon validation (optional)
  body('icon')
    .optional()
    .isString()
    .withMessage('Icon must be a valid URL string'),

  // Display order validation (optional)
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),

  // Is popular validation (optional)
  body('isPopular')
    .optional()
    .isBoolean()
    .withMessage('isPopular must be a boolean value'),
  checkValidationErrors,
];

// Validate bulk categories
exports.validateBulkCategories = [
  body().isArray().withMessage('Request body must be an array'),
  body('*.name')
    .notEmpty()
    .withMessage('Category name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category name must be between 2 and 50 characters'),
  body('*.description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  checkValidationErrors,
];

// Validate service type
exports.validateType = [
  // Name validation
  body('name')
    .trim()
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),

  // Description validation (optional)
  body('description')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Description must be between 5 and 255 characters'),

  // Long description validation (optional)
  body('longDescription')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Long description should be at least 10 characters'),

  // Estimated duration validation
  body('estimatedDuration')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Estimated duration must be a positive integer (in minutes)'),

  // Display image validation (optional)
  body('displayImage')
    .optional()
    .isString()
    .withMessage('Display image must be a valid URL string'),

  // Category ID validation
  body('categoryId')
    .optional()
    .isUUID()
    .withMessage('Category ID must be a valid UUID'),

  // Recommended frequency validation (optional)
  body('recommendedFrequency')
    .optional()
    .isString()
    .withMessage('Recommended frequency must be a string'),

  // Warning threshold validation (optional)
  body('warningThreshold')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Warning threshold must be a non-negative integer'),

  // Display order validation (optional)
  body('displayOrder')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Display order must be a non-negative integer'),

  // Is popular validation (optional)
  body('isPopular')
    .optional()
    .isBoolean()
    .withMessage('isPopular must be a boolean value'),
  checkValidationErrors,
];

// Validate bulk service types
exports.validateBulkTypes = [
  body().isArray().withMessage('Request body must be an array'),
  body('*.name')
    .notEmpty()
    .withMessage('Type name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Type name must be between 2 and 50 characters'),
  body('*.description')
    .optional()
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('*.categoryId')
    .optional()
    .isString()
    .withMessage('Category ID must be a string'),
  checkValidationErrors,
];
