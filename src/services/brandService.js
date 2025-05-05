const { prisma } = require('../models');
const AppError = require('../utils/appError');

// Create a  brand
exports.createBrand = async (data) => {
  return await prisma.brand.create({
    data,
  });
};

// Update a brand by ID
exports.updateBrand = async (id, data) => {
  console.log(id, data);
  const brand = await prisma.brand.findUnique({ where: { id } });

  if (!brand) {
    throw new AppError(`No brand found with ID: ${id}`, 404);
  }

  // If name is being updated, check if it's already in use by another brand
  if (data.name && data.name !== brand.name) {
    const existingBrand = await prisma.brand.findFirst({
      where: {
        name: data.name,
        id: { not: id },
      },
    });

    if (existingBrand) {
      throw new AppError(
        `A brand with name "${data.name}" already exists`,
        400,
      );
    }
  }

  return await prisma.brand.update({
    where: { id },
    data,
  });
};

// Delete a brand by ID
exports.deleteBrand = async (id) => {
  const brand = await prisma.brand.findUnique({
    where: { id: id },
  });

  if (!brand) {
    throw new AppError(`No brand found with ID: ${id}`, 404);
  }

  return await prisma.brand.delete({
    where: { id: id },
  });
};
