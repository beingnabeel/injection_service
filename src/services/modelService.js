const { prisma } = require('../models');
const AppError = require('../utils/appError');

// Create a single model
exports.createModel = async (data) => {
  return await prisma.model.create({
    data,
  });
};

// Update a model by ID
exports.updateModel = async (id, data) => {
  const model = await prisma.model.findUnique({
    where: { id },
  });

  if (!model) {
    throw new AppError(`No model found with ID: ${id}`, 404);
  }

  return await prisma.model.update({
    where: { id },
    data,
  });
};

// Delete a model by ID
exports.deleteModel = async (id) => {
  const model = await prisma.model.findUnique({
    where: { id },
  });

  if (!model) {
    throw new AppError(`No model found with ID: ${id}`, 404);
  }

  return await prisma.model.delete({
    where: { id },
  });
};
