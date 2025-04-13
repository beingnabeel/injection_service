const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { prisma } = require('../models');

// Generic create operation
exports.createItem = catchAsync(async (req, res, next) => {
  const { model, data } = req.body;
  
  if (!model || !data) {
    return next(new AppError('Model and data are required', 400));
  }
  
  if (!prisma[model]) {
    return next(new AppError(`Invalid model: ${model}`, 400));
  }
  
  const result = await prisma[model].create({
    data
  });
  
  res.status(201).json({
    status: 'success',
    data: result
  });
});

// Generic update operation
exports.updateItem = catchAsync(async (req, res, next) => {
  const { model, id, data } = req.body;
  
  if (!model || !id || !data) {
    return next(new AppError('Model, id, and data are required', 400));
  }
  
  if (!prisma[model]) {
    return next(new AppError(`Invalid model: ${model}`, 400));
  }
  
  const result = await prisma[model].update({
    where: { id },
    data
  });
  
  res.status(200).json({
    status: 'success',
    data: result
  });
});

// Generic delete operation
exports.deleteItem = catchAsync(async (req, res, next) => {
  const { model, id } = req.body;
  
  if (!model || !id) {
    return next(new AppError('Model and id are required', 400));
  }
  
  if (!prisma[model]) {
    return next(new AppError(`Invalid model: ${model}`, 400));
  }
  
  await prisma[model].delete({
    where: { id }
  });
  
  res.status(204).json({
    status: 'success',
    data: null
  });
});

// Bulk create operation
exports.bulkCreate = catchAsync(async (req, res, next) => {
  const { model, data } = req.body;
  
  if (!model || !Array.isArray(data) || data.length === 0) {
    return next(new AppError('Model and array of data are required', 400));
  }
  
  if (!prisma[model]) {
    return next(new AppError(`Invalid model: ${model}`, 400));
  }
  
  const result = await prisma[model].createMany({
    data,
    skipDuplicates: true
  });
  
  res.status(201).json({
    status: 'success',
    count: result.count
  });
});