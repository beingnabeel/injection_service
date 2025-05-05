const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const serviceCenterService = require('../services/serviceCenterService');

/**
 * Create a new service center offering
 * @route POST /api/v1/service-centers/:serviceCenterId/offerings
 */
exports.createServiceCenterOffering = catchAsync(async (req, res, next) => {
  const { serviceCenterId } = req.params;

  if (!serviceCenterId) {
    return next(new AppError('Service Center ID is required', 400));
  }

  const offeringData = req.body;

  // Create the service center offering
  const createdOffering =
    await serviceCenterService.createServiceCenterOffering(
      serviceCenterId,
      offeringData,
      req,
    );

  res.status(201).json({
    status: 'success',
    data: createdOffering,
  });
});

/**
 * Update an existing service center offering
 * @route PATCH /api/v1/service-centers/:serviceCenterId/offerings/:serviceCenterOfferingId
 */
exports.updateServiceCenterOffering = catchAsync(async (req, res, next) => {
  const { serviceCenterId, serviceCenterOfferingId } = req.params;

  if (!serviceCenterId) {
    return next(new AppError('Service Center ID is required', 400));
  }

  if (!serviceCenterOfferingId) {
    return next(new AppError('Service Center Offering ID is required', 400));
  }

  const updateData = req.body;

  // Update the service center offering
  const updatedOffering =
    await serviceCenterService.updateServiceCenterOffering(
      serviceCenterId,
      serviceCenterOfferingId,
      updateData,
    );

  res.status(200).json({
    status: 'success',
    data: updatedOffering,
  });
});

// Create a new service center
exports.createServiceCenter = catchAsync(async (req, res, next) => {
  const serviceCenter = await serviceCenterService.createServiceCenter(
    req.body,
  );

  res.status(201).json({
    status: 'success',
    data: {
      serviceCenter,
    },
  });
});

// Update an existing service center
exports.updateServiceCenter = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Service Center ID is required', 400));
  }

  const serviceCenter = await serviceCenterService.updateServiceCenter(
    id,
    req.body,
  );

  res.status(200).json({
    status: 'success',
    data: {
      serviceCenter,
    },
  });
});

// Delete a service center
exports.deleteServiceCenter = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Service Center ID is required', 400));
  }

  await serviceCenterService.deleteServiceCenter(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
