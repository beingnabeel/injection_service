const { prisma } = require('../models');
const AppError = require('../utils/appError');
const transactionService = require('./transactionService');

// Create a single category
exports.createCategory = async (data) => {
  // Convert displayOrder from string to integer if it exists
  if (data.displayOrder) {
    data.displayOrder = parseInt(data.displayOrder, 10);
  }
  
  return await prisma.serviceCategory.create({
    data
  });
};

// Update a category by ID
exports.updateCategory = async (id, data) => {
  // Convert displayOrder from string to integer if it exists
  if (data.displayOrder) {
    data.displayOrder = parseInt(data.displayOrder, 10);
  }

  const category = await prisma.serviceCategory.findUnique({
    where: { serviceCategoryId: id }
  });
  
  if (!category) {
    throw new AppError(`No category found with ID: ${id}`, 404);
  }
  
  return await prisma.serviceCategory.update({
    where: { serviceCategoryId: id },
    data
  });
};

// Delete a category by ID
exports.deleteCategory = async (id) => {
  const category = await prisma.serviceCategory.findUnique({
    where: { serviceCategoryId: id }
  });
  
  if (!category) {
    throw new AppError(`No category found with ID: ${id}`, 404);
  }
  
  return await prisma.serviceCategory.delete({
    where: { serviceCategoryId: id }
  });
};

// Create multiple categories in a transaction
exports.bulkCreateCategories = async (categoriesData) => {
  return await transactionService.executeTransaction(async (tx) => {
    const result = await tx.serviceCategory.createMany({
      data: categoriesData,
      skipDuplicates: true
    });
    
    return result;
  });
};