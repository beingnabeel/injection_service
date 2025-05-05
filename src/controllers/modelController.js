const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const modelService = require('../services/modelService');

// Create a new model
exports.createModel = catchAsync(async (req, res, next) => {
  const model = await modelService.createModel(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      model,
    },
  });
});

// Update an existing model
exports.updateModel = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Model ID is required', 400));
  }

  const model = await modelService.updateModel(id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      model,
    },
  });
});

// Delete a model
exports.deleteModel = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Model ID is required', 400));
  }

  await modelService.deleteModel(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
