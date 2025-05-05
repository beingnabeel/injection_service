const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const serviceCenterOperatingHourService = require('../services/serviceCenterOperatingHourService');

// Create a new service center operating hour
exports.createServiceCenterOperatingHour = catchAsync(
  async (req, res, next) => {
    const operatingHours =
      await serviceCenterOperatingHourService.createServiceCenterOperatingHour(
        req.body,
      );

    res.status(201).json({
      status: 'success',
      data: {
        operatingHours,
      },
    });
  },
);

// Update an existing service center operating hour
exports.updateServiceCenterOperatingHour = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return next(
        new AppError('Service Center Operating Hour ID is required', 400),
      );
    }

    const operatingHours =
      await serviceCenterOperatingHourService.updateServiceCenterOperatingHour(
        id,
        req.body,
      );

    res.status(200).json({
      status: 'success',
      data: {
        operatingHours,
      },
    });
  },
);

// Delete a service center operating hour
exports.deleteServiceCenterOperatingHour = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
      return next(
        new AppError('Service Center Operating Hour ID is required', 400),
      );
    }

    await serviceCenterOperatingHourService.deleteServiceCenterOperatingHour(
      id,
    );

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
