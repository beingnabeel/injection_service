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

// Associate a component with a service type
exports.associateComponentWithType = async (serviceTypeId, data) => {
  // Check if the service type exists
  const serviceType = await prisma.serviceType.findUnique({
    where: { serviceTypeId },
  });

  if (!serviceType) {
    throw new AppError(`No service type found with ID: ${serviceTypeId}`, 404);
  }

  // Check if the service component exists
  const serviceComponent = await prisma.serviceComponent.findUnique({
    where: { serviceComponentId: data.serviceComponentId },
  });

  if (!serviceComponent) {
    throw new AppError(
      `No service component found with ID: ${data.serviceComponentId}`,
      404,
    );
  }

  // Check if the association already exists
  const existingAssociation = await prisma.serviceTypeComponent.findUnique({
    where: {
      serviceTypeId_serviceComponentId: {
        serviceTypeId,
        serviceComponentId: data.serviceComponentId,
      },
    },
  });

  if (existingAssociation) {
    // Update the existing association
    return await prisma.serviceTypeComponent.update({
      where: {
        serviceTypeComponentId: existingAssociation.serviceTypeComponentId,
      },
      // data: {
      //   isDefault:
      //     data.isDefault !== undefined
      //       ? data.isDefault
      //       : existingAssociation.isDefault,
      //   isRequired:
      //     data.isRequired !== undefined
      //       ? data.isRequired
      //       : existingAssociation.isRequired,
      //   additionalPrice:
      //     data.additionalPrice !== undefined
      //       ? data.additionalPrice
      //       : existingAssociation.additionalPrice,
      // },
    });
  }

  // Create a new association
  return await prisma.serviceTypeComponent.create({
    data: {
      serviceTypeId,
      serviceComponentId: data.serviceComponentId,
      // isDefault: data.isDefault !== undefined ? data.isDefault : true,
      // isRequired: data.isRequired !== undefined ? data.isRequired : false,
      // additionalPrice: data.additionalPrice,
    },
  });
};

// // Get all components associated with a service type
exports.getComponentsByTypeId = async (serviceTypeId) => {
  // Check if the service type exists
  const serviceType = await prisma.serviceType.findUnique({
    where: { serviceTypeId },
  });

  if (!serviceType) {
    throw new AppError(`No service type found with ID: ${serviceTypeId}`, 404);
  }

  // Get all the component associations
  const typeComponents = await prisma.serviceTypeComponent.findMany({
    where: { serviceTypeId },
    include: {
      serviceComponent: true,
    },
  });

  return typeComponents;
};

// Remove a component from a service type
exports.removeComponentFromType = async (serviceTypeId, serviceComponentId) => {
  // Check if the service type exists
  const serviceType = await prisma.serviceType.findUnique({
    where: { serviceTypeId },
  });

  if (!serviceType) {
    throw new AppError(`No service type found with ID: ${serviceTypeId}`, 404);
  }

  // Check if the component association exists
  const typeComponent = await prisma.serviceTypeComponent.findUnique({
    where: {
      serviceTypeId_serviceComponentId: {
        serviceTypeId,
        serviceComponentId,
      },
    },
  });

  if (!typeComponent) {
    throw new AppError(
      `Component with ID ${serviceComponentId} is not associated with service type ${serviceTypeId}`,
      404,
    );
  }

  // Delete the association
  await prisma.serviceTypeComponent.delete({
    where: {
      serviceTypeId_serviceComponentId: {
        serviceTypeId,
        serviceComponentId,
      },
    },
  });

  return true; // Success indication
};
