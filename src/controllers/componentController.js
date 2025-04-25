const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const componentService = require('../services/componentService');

exports.createComponent = catchAsync(async (req, res, next) => {
  const component = await componentService.createServiceComponent(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      component,
    },
  });
});

exports.updateComponent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError('Component ID is required', 400));
  }
  const component = await componentService.updateServiceComponent(id, req.body);
  res.status(200).json({
    status: 'success',
    data: {
      component,
    },
  });
});

exports.deleteComponent = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new AppError('Component ID is required', 400));
  }
  await componentService.deleteServiceComponent(id);
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
