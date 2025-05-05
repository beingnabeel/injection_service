const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const serviceCenterSlotService = require('../services/serviceCenterSlotService');

// Create a new service center slot
exports.createServiceCenterSlot = catchAsync(async (req, res, next) => {
  const slot = await serviceCenterSlotService.createServiceCenterSlot(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      slot,
    },
  });
});

// Update a service center slot by ID
exports.updateServiceCenterSlot = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slot = await serviceCenterSlotService.updateServiceCenterSlot(
    id,
    req.body,
  );

  if (!slot) {
    return next(new AppError(`No slot found with ID: ${id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      slot,
    },
  });
});

// Delete a service center slot by ID
exports.deleteServiceCenterSlot = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const slot = await serviceCenterSlotService.deleteServiceCenterSlot(id);

  if (!slot) {
    return next(new AppError(`No slot found with ID: ${id}`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
