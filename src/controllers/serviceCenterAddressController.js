const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const brandService = require('../services/serviceCenterAddressService');

// Create a new service center address
exports.createServiceCenterAddress = catchAsync(async (req, res, next) => {
  const { serviceCenterId } = req.params;
  console.log('req.params', serviceCenterId);
  const serviceCenterAddress = await brandService.createServiceCenterAddress(
    serviceCenterId,
    req.body,
  );

  res.status(201).json({
    status: 'success',
    data: {
      serviceCenterAddress,
    },
  });
});

// Update an existing service center address
exports.updateServiceCenterAddress = catchAsync(async (req, res, next) => {
  const { serviceCenterId } = req.params;

  if (!serviceCenterId) {
    return next(new AppError('Service Center Address ID is required', 400));
  }

  const serviceCenterAddress = await brandService.updateServiceCenterAddress(
    serviceCenterId,
    req.body,
  );

  res.status(200).json({
    status: 'success',
    data: {
      serviceCenterAddress,
    },
  });
});

// Delete a service center address
exports.deleteServiceCenterAddress = catchAsync(async (req, res, next) => {
  const { serviceCenterId } = req.params;

  if (!serviceCenterId) {
    return next(new AppError('Service Center Address ID is required', 400));
  }

  await brandService.deleteServiceCenterAddress(serviceCenterId);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
