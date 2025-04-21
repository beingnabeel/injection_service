const { prisma } = require('../models');
const AppError = require('../utils/appError');
const transactionService = require('./transactionService');

// Create a single service type
exports.createType = async (data) => {
  // Convert displayOrder from string to integer if it exists
  if (data.displayOrder) {
    data.displayOrder = parseInt(data.displayOrder, 10);
  }
  if (data.estimatedDuration) {
    data.estimatedDuration = parseInt(data.estimatedDuration, 10);
  }
  if (data.warningThreshold) {
    data.warningThreshold = parseInt(data.warningThreshold, 10);
  }
  if (data.isPopular) {
    data.isPopular = data.isPopular === 'true' || data.isPopular === true;
  }
  return await prisma.serviceType.create({
    data,
  });
};

// Update a service type by ID
exports.updateType = async (id, data) => {
  if (data.displayOrder) {
    data.displayOrder = parseInt(data.displayOrder, 10);
  }
  if (data.estimatedDuration) {
    data.estimatedDuration = parseInt(data.estimatedDuration, 10);
  }
  if (data.warningThreshold) {
    data.warningThreshold = parseInt(data.warningThreshold, 10);
  }
  if (data.isPopular) {
    data.isPopular = data.isPopular === 'true' || data.isPopular === true;
  }
  const type = await prisma.serviceType.findUnique({
    where: { serviceTypeId: id },
  });

  if (!type) {
    throw new AppError(`No service type found with ID: ${id}`, 404);
  }

  return await prisma.serviceType.update({
    where: { serviceTypeId: id },
    data,
  });
};

// Delete a service type by ID
exports.deleteType = async (id) => {
  const type = await prisma.serviceType.findUnique({
    where: { serviceTypeId: id },
  });

  if (!type) {
    throw new AppError(`No service type found with ID: ${id}`, 404);
  }

  return await prisma.serviceType.delete({
    where: { serviceTypeId: id },
  });
};

// Create multiple service types in a transaction
exports.bulkCreateTypes = async (typesData) => {
  return await transactionService.executeTransaction(async (tx) => {
    const result = await tx.serviceType.createMany({
      data: typesData,
      skipDuplicates: true,
    });

    return result;
  });
};
