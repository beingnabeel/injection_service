const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const categoryService = require('../services/categoryService');

// Create a new category
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await categoryService.createCategory(req.body);
  
  res.status(201).json({
    status: 'success',
    data: {
      category
    }
  });
});

// Update an existing category
exports.updateCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!id) {
    return next(new AppError('Category ID is required', 400));
  }
  
  const category = await categoryService.updateCategory(id, req.body);
  
  res.status(200).json({
    status: 'success',
    data: {
      category
    }
  });
});

// Delete a category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  if (!id) {
    return next(new AppError('Category ID is required', 400));
  }
  
  await categoryService.deleteCategory(id);
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Create multiple categories in bulk
exports.bulkCreateCategories = catchAsync(async (req, res, next) => {
  if (!Array.isArray(req.body) || req.body.length === 0) {
    return next(new AppError('Request body must be an array of categories', 400));
  }
  
  const result = await categoryService.bulkCreateCategories(req.body);
  
  res.status(201).json({
    status: 'success',
    count: result.count
  });
});