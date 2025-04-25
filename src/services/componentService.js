const { prisma } = require('../models');
const AppError = require('../utils/appError');

exports.createServiceComponent = async (data) => {
  if (data.estimatedDuration <= 0) {
    throw new AppError('Estimated duration must be a positive integer', 400);
  }
  if (data.vehicleType !== 'CAR' && data.vehicleType !== 'BIKE') {
    throw new AppError('Vehicle type must be one of: CAR, BIKE', 400);
  }
  if (data.estimatedDuration) {
    data.estimatedDuration = parseInt(data.estimatedDuration, 10);
  }
  return await prisma.serviceComponent.create({
    data,
  });
};

exports.updateServiceComponent = async (id, data) => {
  // Only validate estimatedDuration if it's included in the update
  if (data.estimatedDuration !== undefined) {
    if (data.estimatedDuration <= 0) {
      throw new AppError('Estimated duration must be a positive integer', 400);
    }
    // Convert to integer
    data.estimatedDuration = parseInt(data.estimatedDuration, 10);
  }

  // Only validate vehicleType if it's included in the update
  if (
    data.vehicleType !== undefined &&
    data.vehicleType !== 'CAR' &&
    data.vehicleType !== 'BIKE'
  ) {
    throw new AppError('Vehicle type must be one of: CAR, BIKE', 400);
  }
  return await prisma.serviceComponent.update({
    where: {
      serviceComponentId: id,
    },
    data,
  });
};

exports.deleteServiceComponent = async (id) => {
  const component = await prisma.serviceComponent.findUnique({
    where: { serviceComponentId: id },
  });
  if (!component) {
    throw new AppError('Component not found', 404);
  }
  return await prisma.serviceComponent.delete({
    where: { serviceComponentId: id },
  });
};
