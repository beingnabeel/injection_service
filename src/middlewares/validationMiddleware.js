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

// Validate component
exports.validateComponent = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Name must be between 2 and 255 characters'),
  body('cost')
    .notEmpty()
    .withMessage('Cost is required')
    .isFloat({ min: 0 })
    .withMessage('Cost must be a non-negative decimal'),
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
  body('cost')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Cost must be a non-negative decimal'),
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

  // body('isDefault')
  //   .optional()
  //   .isBoolean()
  //   .withMessage('isDefault must be a boolean value'),

  // body('isRequired')
  //   .optional()
  //   .isBoolean()
  //   .withMessage('isRequired must be a boolean value'),

  // body('additionalPrice')
  //   .optional()
  //   .isFloat({ min: 0 })
  //   .withMessage('Additional price must be a non-negative number'),
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
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Base price must be a non-negative number'),

  // Discount validations
  body('discountPercentage')
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage('Discount percentage must be between 0 and 100'),

  // body('discountAbsolute')
  //   .optional()
  //   .isFloat({ min: 0 })
  //   .withMessage('Absolute discount must be a non-negative number'),

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

  // body('hasPickupDropService')
  //   .optional()
  //   .isBoolean()
  //   .withMessage('hasPickupDropService must be a boolean'),

  // body('pickupDropFee')
  //   .optional()
  //   .isFloat({ min: 0 })
  //   .withMessage('Pickup/drop fee must be a non-negative number'),

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

  // body('discountAbsolute')
  //   .optional()
  //   .isFloat({ min: 0 })
  //   .withMessage('Absolute discount must be a non-negative number'),

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

  // body('hasPickupDropService')
  //   .optional()
  //   .isBoolean()
  //   .withMessage('hasPickupDropService must be a boolean'),

  // body('pickupDropFee')
  //   .optional()
  //   .isFloat({ min: 0 })
  //   .withMessage('Pickup/drop fee must be a non-negative number'),

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
// Validate brand creation
exports.validateBrand = [
  body('name')
    .notEmpty()
    .withMessage('Brand name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Brand name must be between 2 and 255 characters'),
  body('vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required')
    .isIn(['CAR', 'BIKE'])
    .withMessage('Vehicle type must be one of: CAR, BIKE'),
  body('logo')
    .optional()
    .isString()
    .withMessage('Logo must be a valid URL string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  checkValidationErrors,
];
// Validate brand update
exports.validateBrandUpdate = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Brand name must be between 2 and 255 characters'),
  body('vehicleType')
    .optional()
    .isIn(['CAR', 'BIKE'])
    .withMessage('Vehicle type must be one of: CAR, BIKE'),
  body('logo')
    .optional()
    .isString()
    .withMessage('Logo must be a valid URL string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  checkValidationErrors,
];
// Validate model creation
exports.validateModel = [
  body('name')
    .notEmpty()
    .withMessage('Model name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Model name must be between 2 and 255 characters'),
  body('brandId').notEmpty().withMessage('Brand ID is required'),
  body('vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required')
    .isIn(['CAR', 'BIKE'])
    .withMessage('Vehicle type must be one of: CAR, BIKE'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
  body('imageUrl')
    .optional()
    .isString()
    .withMessage('Image URL must be a valid string'),
  checkValidationErrors,
];
// Validate model update
exports.validateModelUpdate = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Model name must be between 2 and 255 characters'),
  body('brandId').optional(),
  body('vehicleType')
    .optional()
    .isIn(['CAR', 'BIKE'])
    .withMessage('Vehicle type must be one of: CAR, BIKE'),
  body('isActive')
    .optional()
    .isBoolean()
    .withMessage('isActive must be a boolean value'),
  body('imageUrl')
    .optional()
    .isString()
    .withMessage('Image URL must be a valid string'),
  checkValidationErrors,
];
// Validate service center creation
exports.validateServiceCenter = [
  body('name')
    .notEmpty()
    .withMessage('Service center name is required')
    .isLength({ min: 2, max: 255 })
    .withMessage('Service center name must be between 2 and 255 characters'),
  body('brandId').notEmpty().withMessage('Brand ID is required'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Invalid phone number format'),
  body('alternatePhone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid alternate phone number format'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CLOSED', 'COMING_SOON'])
    .withMessage(
      'Status must be one of: ACTIVE, INACTIVE, MAINTENANCE, CLOSED, COMING_SOON',
    ),
  body('capacity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('images.*')
    .optional()
    .isString()
    .withMessage('Each image must be a string URL'),
  checkValidationErrors,
];
// Validate service center update
exports.validateServiceCenterUpdate = [
  body('name')
    .optional()
    .isLength({ min: 2, max: 255 })
    .withMessage('Service center name must be between 2 and 255 characters'),
  body('brandId').optional(),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid phone number format'),
  body('alternatePhone')
    .optional()
    .isMobilePhone()
    .withMessage('Invalid alternate phone number format'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('website').optional().isURL().withMessage('Website must be a valid URL'),
  body('status')
    .optional()
    .isIn(['ACTIVE', 'INACTIVE', 'MAINTENANCE', 'CLOSED', 'COMING_SOON'])
    .withMessage(
      'Status must be one of: ACTIVE, INACTIVE, MAINTENANCE, CLOSED, COMING_SOON',
    ),
  body('rating')
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Rating must be between 0 and 5'),
  body('totalRatings')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Total ratings must be a non-negative integer'),
  body('capacity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Capacity must be a positive integer'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('images').optional().isArray().withMessage('Images must be an array'),
  body('images.*')
    .optional()
    .isString()
    .withMessage('Each image must be a string URL'),
  checkValidationErrors,
];
// Validate address for service center
exports.validateAddress = [
  body('street')
    .notEmpty()
    .withMessage('Street is required')
    .isString()
    .withMessage('Street must be a string'),
  body('city')
    .notEmpty()
    .withMessage('City is required')
    .isString()
    .withMessage('City must be a string'),
  body('state')
    .notEmpty()
    .withMessage('State is required')
    .isString()
    .withMessage('State must be a string'),
  body('country')
    .notEmpty()
    .withMessage('Country is required')
    .isString()
    .withMessage('Country must be a string'),
  body('postalCode')
    .notEmpty()
    .withMessage('Postal code is required')
    .isString()
    .withMessage('Postal code must be a string'),
  body('landmark')
    .optional()
    .isString()
    .withMessage('Landmark must be a string'),
  body('additionalInfo')
    .optional()
    .isString()
    .withMessage('Additional info must be a string'),
  body('longitude')
    .notEmpty()
    .withMessage('Longitude is required')
    .isFloat({ min: -180, max: 180 })
    .withMessage('Longitude must be between -180 and 180'),
  body('latitude')
    .notEmpty()
    .withMessage('Latitude is required')
    .isFloat({ min: -90, max: 90 })
    .withMessage('Latitude must be between -90 and 90'),
  body('isVerified')
    .optional()
    .isBoolean()
    .withMessage('isVerified must be a boolean value'),
  body('serviceCenterId')
    .notEmpty()
    .withMessage('Service center ID is required'),
  checkValidationErrors,
];

// Validate operating hours for service center
exports.validateOperatingHours = [
  body('serviceCenterId')
    .notEmpty()
    .withMessage('Service center ID is required'),
  body('openTime')
    .notEmpty()
    .withMessage('Open time is required')
    .isISO8601()
    .withMessage('Open time must be in ISO8601 format'),
  body('closeTime')
    .notEmpty()
    .withMessage('Close time is required')
    .isISO8601()
    .withMessage('Close time must be in ISO8601 format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.openTime)) {
        throw new Error('Close time must be after open time');
      }
      return true;
    }),
  body('isClosed')
    .optional()
    .isBoolean()
    .withMessage('isClosed must be a boolean value'),
  body('isHoliday')
    .optional()
    .isBoolean()
    .withMessage('isHoliday must be a boolean value'),

  checkValidationErrors,
];

// Validate slot creation for service center
exports.validateSlot = [
  body('serviceCenterId')
    .notEmpty()
    .withMessage('Service center ID is required'),
  body('startTime')
    .notEmpty()
    .withMessage('Start time is required')
    .isISO8601()
    .withMessage('Start time must be in ISO8601 format'),
  body('endTime')
    .notEmpty()
    .withMessage('End time is required')
    .isISO8601()
    .withMessage('End time must be in ISO8601 format')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startTime)) {
        throw new Error('End time must be after start time');
      }
      return true;
    }),
  body('isAvailable')
    .optional()
    .isBoolean()
    .withMessage('isAvailable must be a boolean value'),
  body('slotCapacity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Slot capacity must be a positive integer'),
  body('bookedCapacity')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Booked capacity must be a non-negative integer')
    .custom((value, { req }) => {
      const slotCapacity = req.body.slotCapacity || 1;
      if (value > slotCapacity) {
        throw new Error('Booked capacity cannot exceed slot capacity');
      }
      return true;
    }),
  body('isBlocked')
    .optional()
    .isBoolean()
    .withMessage('isBlocked must be a boolean value'),
  body('blockReason')
    .optional()
    .isString()
    .withMessage('Block reason must be a string'),
  body('externalBookingIds')
    .optional()
    .isArray()
    .withMessage('External booking IDs must be an array'),
  body('externalBookingIds.*')
    .optional()
    .isString()
    .withMessage('Each external booking ID must be a string'),
  checkValidationErrors,
];
