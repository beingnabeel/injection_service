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

// Validate component
exports.validateComponent = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Description must be between 5 and 255 characters'),
  body('estimatedDuration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Estimated duration must be a non-negative integer'),
  body('vehicleType')
    .optional()
    .isIn(['CAR', 'BIKE'])
    .withMessage('Vehicle type must be one of: CAR, BIKE'),
  checkValidationErrors,
];

exports.validateComponentUpdate = [
  body('name')
    .trim()
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 5, max: 255 })
    .withMessage('Description must be between 5 and 255 characters'),
  body('estimatedDuration')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Estimated duration must be a non-negative integer'),
  body('vehicleType')
    .optional()
    .isIn(['CAR', 'BIKE'])
    .withMessage('Vehicle type must be one of: CAR, BIKE'),
  checkValidationErrors,
];

exports.validateTypeComponent = [
  body('serviceComponentId')
    .notEmpty()
    .withMessage('Service component ID is required')
    .isUUID()
    .withMessage('Service component ID must be a valid UUID'),

  body('isDefault')
    .optional()
    .isBoolean()
    .withMessage('isDefault must be a boolean value'),

  body('isRequired')
    .optional()
    .isBoolean()
    .withMessage('isRequired must be a boolean value'),

  body('additionalPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Additional price must be a non-negative number'),
  checkValidationErrors,
];

// Validate service center offering
exports.validateServiceCenterOffering = [
  // Service Type ID validation
  body('serviceTypeId')
    .notEmpty()
    .withMessage('Service Type ID is required')
    .isUUID()
    .withMessage('Service Type ID must be a valid UUID'),

  // Status validation
  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE', 'PENDING'])
    .withMessage('Status must be one of: ACTIVE, INACTIVE, PENDING'),

  // Price validation
  body('basePrice')
    .notEmpty()
    .withMessage('Base price is required')
    .isFloat({ min: 0 })
    .withMessage('Base price must be a non-negative number'),

  // Discount validations
  body('discountPercentage')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100'),

  body('discountAbsolute')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Absolute discount must be a non-negative number'),

  body('discountValidUntil')
    .optional()
    .isISO8601()
    .withMessage('Discount valid until must be a valid date'),

  // Time validations
  body('timeToComplete')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Time to complete must be a positive integer'),

  // Priority validations
  body('availablePriorities')
    .optional()
    .isArray()
    .withMessage('Available priorities must be an array')
    .custom((priorities) => {
      const validPriorities = ['NORMAL', 'EXPRESS', 'PREMIUM'];
      return priorities.every((p) => validPriorities.includes(p));
    })
    .withMessage('Each priority must be one of: NORMAL, EXPRESS, PREMIUM'),

  body('priorityPrices')
    .optional()
    .custom((prices) => {
      if (typeof prices !== 'object') return false;

      // Check that all keys are valid priorities and all values are non-negative numbers
      const validPriorities = ['NORMAL', 'EXPRESS', 'URGENT'];
      return Object.entries(prices).every(([priority, price]) => {
        return (
          validPriorities.includes(priority) &&
          typeof price === 'number' &&
          price >= 0
        );
      });
    })
    .withMessage(
      'Priority prices must be an object with valid priorities as keys and non-negative numbers as values',
    ),

  // Booking validation
  body('minimumAdvanceBooking')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum advance booking must be a non-negative integer'),

  // Terms and conditions
  body('termsAndConditions')
    .optional()
    .isString()
    .withMessage('Terms and conditions must be a string'),

  // Payment policy validation
  body('paymentPolicy')
    .optional()
    .isIn([
      'PAYMENT_AFTER_SERVICE',
      'PAYMENT_BEFORE_SERVICE',
      'PAYMENT_INSTALLMENTS',
    ])
    .withMessage(
      'Payment policy must be one of: PAYMENT_AFTER_SERVICE, PAYMENT_BEFORE_SERVICE, PAYMENT_INSTALLMENTS',
    ),

  // Warranty validations
  body('warrantyDays')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Warranty days must be a non-negative integer'),

  body('warrantyKilometers')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Warranty kilometers must be a non-negative integer'),

  // Feature flags
  body('isHighlighted')
    .optional()
    .isBoolean()
    .withMessage('isHighlighted must be a boolean'),

  body('hasPickupDropService')
    .optional()
    .isBoolean()
    .withMessage('hasPickupDropService must be a boolean'),

  body('pickupDropFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Pickup/drop fee must be a non-negative number'),

  body('hasEmergencyService')
    .optional()
    .isBoolean()
    .withMessage('hasEmergencyService must be a boolean'),

  body('emergencyServiceFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Emergency service fee must be a non-negative number'),

  checkValidationErrors,
];
exports.validateUpdateServiceCenterOffering = [
  body('serviceTypeId')
    .optional()
    .isUUID()
    .withMessage('Service Type ID must be a valid UUID'),

  // Status validation
  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE', 'PENDING'])
    .withMessage('Status must be one of: ACTIVE, INACTIVE, PENDING'),

  // Price validation
  body('basePrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Base price must be a non-negative number'),

  // Discount validations
  body('discountPercentage')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100'),

  body('discountAbsolute')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Absolute discount must be a non-negative number'),

  body('discountValidUntil')
    .optional()
    .isISO8601()
    .withMessage('Discount valid until must be a valid date'),

  // Time validations
  body('timeToComplete')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Time to complete must be a positive integer'),

  // Priority validations
  body('availablePriorities')
    .optional()
    .isArray()
    .withMessage('Available priorities must be an array')
    .custom((priorities) => {
      const validPriorities = ['NORMAL', 'EXPRESS', 'PREMIUM'];
      return priorities.every((p) => validPriorities.includes(p));
    })
    .withMessage('Each priority must be one of: NORMAL, EXPRESS, PREMIUM'),

  body('priorityPrices')
    .optional()
    .custom((prices) => {
      if (typeof prices !== 'object') return false;

      // Check that all keys are valid priorities and all values are non-negative numbers
      const validPriorities = ['NORMAL', 'EXPRESS', 'URGENT'];
      return Object.entries(prices).every(([priority, price]) => {
        return (
          validPriorities.includes(priority) &&
          typeof price === 'number' &&
          price >= 0
        );
      });
    })
    .withMessage(
      'Priority prices must be an object with valid priorities as keys and non-negative numbers as values',
    ),

  // Booking validation
  body('minimumAdvanceBooking')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Minimum advance booking must be a non-negative integer'),

  // Terms and conditions
  body('termsAndConditions')
    .optional()
    .isString()
    .withMessage('Terms and conditions must be a string'),

  // Payment policy validation
  body('paymentPolicy')
    .optional()
    .isIn([
      'PAYMENT_AFTER_SERVICE',
      'PAYMENT_BEFORE_SERVICE',
      'PAYMENT_INSTALLMENTS',
    ])
    .withMessage(
      'Payment policy must be one of: PAYMENT_AFTER_SERVICE, PAYMENT_BEFORE_SERVICE, PAYMENT_INSTALLMENTS',
    ),

  // Warranty validations
  body('warrantyDays')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Warranty days must be a non-negative integer'),

  body('warrantyKilometers')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Warranty kilometers must be a non-negative integer'),

  // Feature flags
  body('isHighlighted')
    .optional()
    .isBoolean()
    .withMessage('isHighlighted must be a boolean'),

  body('hasPickupDropService')
    .optional()
    .isBoolean()
    .withMessage('hasPickupDropService must be a boolean'),

  body('pickupDropFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Pickup/drop fee must be a non-negative number'),

  body('hasEmergencyService')
    .optional()
    .isBoolean()
    .withMessage('hasEmergencyService must be a boolean'),

  body('emergencyServiceFee')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Emergency service fee must be a non-negative number'),

  checkValidationErrors,
];
