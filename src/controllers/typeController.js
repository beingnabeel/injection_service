const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const typeService = require('../services/typeService');

// Create a new service type
exports.createType = catchAsync(async (req, res, next) => {
  const type = await typeService.createType(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      type,
    },
  });
});

// Update an existing service type
exports.updateType = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Type ID is required', 400));
  }

  const type = await typeService.updateType(id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      type,
    },
  });
});

// Delete a service type
exports.deleteType = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Type ID is required', 400));
  }

  await typeService.deleteType(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// Create multiple service types in bulk
exports.bulkCreateTypes = catchAsync(async (req, res, next) => {
  if (!Array.isArray(req.body) || req.body.length === 0) {
    return next(
      new AppError('Request body must be an array of service types', 400),
    );
  }

  const result = await typeService.bulkCreateTypes(req.body);

  res.status(201).json({
    status: 'success',
    count: result.count,
  });
});
