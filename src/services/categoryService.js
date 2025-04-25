const { prisma } = require('../models');
const AppError = require('../utils/appError');
const transactionService = require('./transactionService');

// Create a single category
exports.createCategory = async (data) => {
  try {
    // Convert displayOrder from string to integer if it exists
    if (data.displayOrder) {
      data.displayOrder = parseInt(data.displayOrder, 10);
    }

    // Convert isPopular from string to boolean if it exists
    if (data.isPopular !== undefined) {
      // Handle both string values 'true'/'false' and actual boolean values
      data.isPopular =
        data.isPopular === 'true' ||
        (data.isPopular !== 'false' && Boolean(data.isPopular));
    }

    return await prisma.serviceCategory.create({
      data,
    });
  } catch (error) {
    // Check if this is a unique constraint violation
    if (error.code === 'P2002') {
      // Extract the constraint fields from the error message
      const fields = error.meta?.target || ['name', 'vehicleType'];

      // Create a properly formatted error with detailed information
      const err = new AppError(
        `Service category already exists with this combination of ${fields.join(', ')}`,
        409,
      );
      err.code = 'DUPLICATE_RESOURCE';
      err.details = {
        fields,
        message: `A service category with ${fields.join(' and ')} '${data.name}, ${data.vehicleType}' already exists`,
      };
      throw err;
    }
    // Rethrow other errors
    throw error;
  }
};

// Update a category by ID
exports.updateCategory = async (id, data) => {
  try {
    // Convert displayOrder from string to integer if it exists
    if (data.displayOrder) {
      data.displayOrder = parseInt(data.displayOrder, 10);
    }

    // Convert isPopular from string to boolean if it exists
    if (data.isPopular !== undefined) {
      // Handle both string values 'true'/'false' and actual boolean values
      data.isPopular =
        data.isPopular === 'true' ||
        (data.isPopular !== 'false' && Boolean(data.isPopular));
    }

    const category = await prisma.serviceCategory.findUnique({
      where: { serviceCategoryId: id },
    });

    if (!category) {
      throw new AppError(`No category found with ID: ${id}`, 404);
    }

    return await prisma.serviceCategory.update({
      where: { serviceCategoryId: id },
      data,
    });
  } catch (error) {
    // Check if this is a unique constraint violation
    if (error.code === 'P2002') {
      // Extract the constraint fields from the error message
      const fields = error.meta?.target || ['name', 'vehicleType'];

      // Create a properly formatted error with detailed information
      const err = new AppError(
        `Service category already exists with this combination of ${fields.join(', ')}`,
        409,
      );
      err.code = 'DUPLICATE_RESOURCE';
      err.details = {
        fields,
        message: `A service category with ${fields.join(' and ')} '${data.name}, ${data.vehicleType}' already exists`,
      };
      throw err;
    }
    // Rethrow other errors
    throw error;
  }
};

// Delete a category by ID
exports.deleteCategory = async (id) => {
  const category = await prisma.serviceCategory.findUnique({
    where: { serviceCategoryId: id },
  });

  if (!category) {
    throw new AppError(`No category found with ID: ${id}`, 404);
  }

  return await prisma.serviceCategory.delete({
    where: { serviceCategoryId: id },
  });
};

// Create multiple categories in a transaction
exports.bulkCreateCategories = async (categoriesData) => {
  return await transactionService.executeTransaction(async (tx) => {
    const result = await tx.serviceCategory.createMany({
      data: categoriesData,
      skipDuplicates: true,
    });

    return result;
  });
};
