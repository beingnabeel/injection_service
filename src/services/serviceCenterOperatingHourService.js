const { prisma } = require('../models');
const AppError = require('../utils/appError');

// Create a service center operating hour by service center ID
exports.createServiceCenterOperatingHour = async (data) => {
  // Check if service center exists

  return await prisma.operatingHours.create({
    data: {
      ...data,
    },
  });
};

// Update a service center operating hour by ID
exports.updateServiceCenterOperatingHour = async (id, data) => {
  const operatingHours = await prisma.operatingHours.findUnique({
    where: { id },
  });

  if (!operatingHours) {
    throw new AppError(`No operating hours found with ID: ${id}`, 404);
  }

  return await prisma.operatingHours.update({
    where: { id },
    data,
  });
};

// Delete a service center operating hour by ID
exports.deleteServiceCenterOperatingHour = async (id) => {
  const operatingHours = await prisma.operatingHours.findUnique({
    where: { id },
  });

  if (!operatingHours) {
    throw new AppError(`No operating hours found with ID: ${id}`, 404);
  }

  return await prisma.operatingHours.delete({
    where: { id },
  });
};
