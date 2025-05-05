const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const brandService = require('../services/brandService');

// Create a new brand
exports.createBrand = catchAsync(async (req, res, next) => {
  const brand = await brandService.createBrand(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      brand,
    },
  });
});

//Update an existing brand
exports.updateBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Brand ID is required', 400));
  }

  const brand = await brandService.updateBrand(id, req.body);

  res.status(200).json({
    status: 'success',
    data: {
      brand,
    },
  });
});

// Delete a brand
exports.deleteBrand = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Brand ID is required', 400));
  }

  await brandService.deleteBrand(id);

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
