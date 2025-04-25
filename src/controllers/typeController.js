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

// Associate a component with a service type
exports.associateComponentWithType = catchAsync(async (req, res, next) => {
  const { serviceTypeId } = req.params;

  if (!serviceTypeId) {
    return next(new AppError('Service Type ID is required', 400));
  }

  const typeComponent = await typeService.associateComponentWithType(
    serviceTypeId,
    req.body,
  );

  res.status(201).json({
    status: 'success',
    data: {
      typeComponent,
    },
  });
});

// Get all components associated with a service type
exports.getComponentsByTypeId = catchAsync(async (req, res, next) => {
  const { serviceTypeId } = req.params;

  if (!serviceTypeId) {
    return next(new AppError('Service Type ID is required', 400));
  }

  const components = await typeService.getComponentsByTypeId(serviceTypeId);

  res.status(200).json({
    status: 'success',
    data: {
      components,
    },
  });
});

// Remove a component from a service type
exports.removeComponentFromType = catchAsync(async (req, res, next) => {
  const { serviceTypeId, serviceComponentId } = req.params;

  if (!serviceTypeId) {
    return next(new AppError('Service Type ID is required', 400));
  }

  if (!serviceComponentId) {
    return next(new AppError('Service Component ID is required', 400));
  }

  await typeService.removeComponentFromType(serviceTypeId, serviceComponentId);

  // Return 204 No Content for successful deletion
  res.status(204).send();
});
