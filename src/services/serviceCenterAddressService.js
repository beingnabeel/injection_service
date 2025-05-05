const { prisma } = require('../models');
const AppError = require('../utils/appError');

// Create a address for a service center by service center ID
exports.createServiceCenterAddress = async (serviceCenterId, data) => {
  // Check if service center exists
  const serviceCenter = await prisma.serviceCenter.findUnique({
    where: { id: serviceCenterId },
  });

  if (!serviceCenter) {
    throw new AppError(
      `No service center found with ID: ${serviceCenterId}`,
      404,
    );
  }

  return await prisma.address.create({
    data: {
      ...data,
      serviceCenterId,
    },
  });
};

// Update a address by ID
exports.updateServiceCenterAddress = async (serviceCenterId, data) => {
  const address = await prisma.address.findUnique({
    where: { serviceCenterId },
  });

  if (!address) {
    throw new AppError(`No address found with ID: ${serviceCenterId}`, 404);
  }

  return await prisma.address.update({
    where: { serviceCenterId },
    data,
  });
};

// Delete a address by ID
exports.deleteServiceCenterAddress = async (serviceCenterId) => {
  const address = await prisma.address.findUnique({
    where: { serviceCenterId },
  });

  if (!address) {
    throw new AppError(`No address found with ID: ${serviceCenterId}`, 404);
  }

  return await prisma.address.delete({
    where: { serviceCenterId },
  });
};
