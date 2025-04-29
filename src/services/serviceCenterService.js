const axios = require('axios');
const { prisma } = require('../models/index');
const AppError = require('../utils/appError');
const { logger } = require('../utils/logger');

const SERVICE_TYPE_API_URL = 'http://localhost:5000';
/**
 * Create a new service center offering
 * @param {string} serviceCenterId - The ID of the service center
 * @param {Object} offeringData - The data for the new service center offering
 * @returns {Promise<Object>} - The created service center offering
 */
// exports.createServiceCenterOffering = async (serviceCenterId, offeringData) => {
//   try {
//     logger.info({
//       message: 'Starting service center offering creation process',
//       metadata: { serviceCenterId, serviceTypeId: offeringData.serviceTypeId },
//     });

//     // Format the data for creating the service offering
//     const serviceOfferingData = {
//       serviceCenterId,
//       serviceTypeId: offeringData.serviceTypeId,
//       status: offeringData.status || 'ACTIVE',
//       basePrice: parseFloat(offeringData.basePrice),
//       discountPercentage: offeringData.discountPercentage
//         ? parseFloat(offeringData.discountPercentage)
//         : null,
//       // discountAbsolute: offeringData.discountAbsolute
//       //   ? parseFloat(offeringData.discountAbsolute)
//       //   : null,
//       discountValidUntil: offeringData.discountValidUntil
//         ? new Date(offeringData.discountValidUntil)
//         : null,
//       timeToComplete: offeringData.timeToComplete
//         ? parseInt(offeringData.timeToComplete)
//         : null,
//       availablePriorities: offeringData.availablePriorities || ['NORMAL'],
//       priorityPrices: offeringData.priorityPrices || {},
//       minimumAdvanceBooking: offeringData.minimumAdvanceBooking
//         ? parseInt(offeringData.minimumAdvanceBooking)
//         : null,
//       termsAndConditions: offeringData.termsAndConditions || null,
//       paymentPolicy: offeringData.paymentPolicy || 'PAYMENT_AFTER_SERVICE',
//       warrantyDays: offeringData.warrantyDays
//         ? parseInt(offeringData.warrantyDays)
//         : null,
//       warrantyKilometers: offeringData.warrantyKilometers
//         ? parseInt(offeringData.warrantyKilometers)
//         : null,
//       isHighlighted: offeringData.isHighlighted || false,
//       // hasPickupDropService: offeringData.hasPickupDropService || false,
//       // pickupDropFee: offeringData.pickupDropFee
//       //   ? parseFloat(offeringData.pickupDropFee)
//       //   : null,
//       hasEmergencyService: offeringData.hasEmergencyService || false,
//       emergencyServiceFee: offeringData.emergencyServiceFee
//         ? parseFloat(offeringData.emergencyServiceFee)
//         : null,
//     };

//     // Simple direct approach - try to create the offering and let Prisma handle constraints
//     const createdOffering = await prisma.serviceCenterOffering.create({
//       data: serviceOfferingData,
//     });

//     logger.info({
//       message: 'Service center offering created successfully',
//       metadata: {
//         serviceCenterOfferingId: createdOffering.serviceCenterOfferingId,
//         serviceCenterId,
//         serviceTypeId: offeringData.serviceTypeId,
//       },
//     });

//     return createdOffering;
//   } catch (error) {
//     logger.error({
//       message: 'Error creating service center offering',
//       metadata: {
//         serviceCenterId,
//         serviceTypeId: offeringData?.serviceTypeId,
//         errorName: error.name,
//         errorMessage: error.message,
//         errorCode: error.code,
//         stack: error.stack,
//       },
//     });

//     if (error instanceof AppError) throw error;

//     // Handle specific Prisma errors
//     if (error.code === 'P2002') {
//       throw new AppError(
//         'A service center offering for this service type already exists',
//         409,
//       );
//     }

//     if (error.code === 'P2003') {
//       throw new AppError(
//         `Foreign key constraint failed: ${error.meta?.field_name}`,
//         404,
//       );
//     }

//     throw new AppError(
//       `Failed to create service center offering: ${error.message}`,
//       500,
//     );
//   }
// };
// the below one is the updated code for the service center offering :
exports.createServiceCenterOffering = async (
  serviceCenterId,
  offeringData,
  req,
) => {
  try {
    logger.info({
      message: 'Starting service center offering creation process',
      metadata: {
        serviceCenterId,
        serviceTypeId: offeringData.serviceTypeId,
      },
    });

    // Fetch service components for this service type to calculate base price
    const authToken = req.headers.authorization;
    const componentsResponse = await axios.get(
      `${SERVICE_TYPE_API_URL}/api/v1/types/${offeringData.serviceTypeId}/components`,
      {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json',
          // Include auth header if needed
          // 'Authorization': `Bearer ${process.env.SERVICE_API_TOKEN}`
          Authorization: authToken,
        },
      },
    );

    // Calculate total cost from all components
    const components = componentsResponse.data.data.ServiceTypeComponents || [];
    const calculatedBasePrice = components.reduce(
      (total, component) => total + parseFloat(component.cost || 0),
      0,
    );

    logger.info({
      message: 'Calculated base price from components',
      metadata: {
        serviceTypeId: offeringData.serviceTypeId,
        componentCount: components.length,
        calculatedBasePrice,
      },
    });

    // Use the calculated price or the provided price if specified
    const basePrice =
      offeringData.basePrice !== undefined
        ? parseFloat(offeringData.basePrice)
        : calculatedBasePrice;

    // Format the data for creating the service offering
    const serviceOfferingData = {
      serviceCenterId,
      serviceTypeId: offeringData.serviceTypeId,
      status: offeringData.status || 'ACTIVE',
      basePrice, // Use the calculated or provided base price
      discountPercentage: offeringData.discountPercentage
        ? parseFloat(offeringData.discountPercentage)
        : null,
      discountValidUntil: offeringData.discountValidUntil
        ? new Date(offeringData.discountValidUntil)
        : null,
      timeToComplete: offeringData.timeToComplete
        ? parseInt(offeringData.timeToComplete)
        : null,
      availablePriorities: offeringData.availablePriorities || ['NORMAL'],
      priorityPrices: offeringData.priorityPrices || {},
      minimumAdvanceBooking: offeringData.minimumAdvanceBooking
        ? parseInt(offeringData.minimumAdvanceBooking)
        : null,
      termsAndConditions: offeringData.termsAndConditions || null,
      paymentPolicy: offeringData.paymentPolicy || 'PAYMENT_AFTER_SERVICE',
      warrantyDays: offeringData.warrantyDays
        ? parseInt(offeringData.warrantyDays)
        : null,
      warrantyKilometers: offeringData.warrantyKilometers
        ? parseInt(offeringData.warrantyKilometers)
        : null,
      isHighlighted: offeringData.isHighlighted || false,
      hasEmergencyService: offeringData.hasEmergencyService || false,
      emergencyServiceFee: offeringData.emergencyServiceFee
        ? parseFloat(offeringData.emergencyServiceFee)
        : null,
    };

    // Create the offering with the calculated or provided base price
    const createdOffering = await prisma.serviceCenterOffering.create({
      data: serviceOfferingData,
    });

    logger.info({
      message: 'Service center offering created successfully',
      metadata: {
        serviceCenterOfferingId: createdOffering.serviceCenterOfferingId,
        serviceCenterId,
        serviceTypeId: offeringData.serviceTypeId,
        basePrice: createdOffering.basePrice,
      },
    });

    return createdOffering;
  } catch (error) {
    // Error handling for API request to service types
    if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
      logger.error({
        message: 'Unable to connect to service type API',
        metadata: {
          serviceTypeId: offeringData.serviceTypeId,
          errorMessage: error.message,
        },
      });
      throw new AppError(
        'Unable to fetch component data to calculate price. Please try again later.',
        503,
      );
    }

    logger.error({
      message: 'Error creating service center offering',
      metadata: {
        serviceCenterId,
        serviceTypeId: offeringData?.serviceTypeId,
        errorName: error.name,
        errorMessage: error.message,
        errorCode: error.code,
        stack: error.stack,
      },
    });

    if (error instanceof AppError) throw error;

    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      throw new AppError(
        'A service center offering for this service type already exists',
        409,
      );
    }

    if (error.code === 'P2003') {
      throw new AppError(
        `Foreign key constraint failed: ${error.meta?.field_name}`,
        404,
      );
    }

    throw new AppError(
      `Failed to create service center offering: ${error.message}`,
      500,
    );
  }
};
/**
 * Update an existing service center offering
 * @param {string} serviceCenterId - The ID of the service center
 * @param {string} serviceCenterOfferingId - The ID of the service center offering
 * @param {Object} updateData - The data to update in the service center offering
 * @returns {Promise<Object>} - The updated service center offering
 */
exports.updateServiceCenterOffering = async (
  serviceCenterId,
  serviceCenterOfferingId,
  updateData,
) => {
  try {
    logger.info({
      message: 'Starting service center offering update process',
      metadata: { serviceCenterId, serviceCenterOfferingId },
    });

    // First check if the offering exists and belongs to the service center
    const existingOffering = await prisma.serviceCenterOffering.findFirst({
      where: {
        serviceCenterOfferingId,
        serviceCenterId,
      },
    });

    if (!existingOffering) {
      throw new AppError(
        `Service center offering not found with ID: ${serviceCenterOfferingId}`,
        404,
      );
    }

    // Format the update data with proper type conversions
    const updateDataFormatted = {};

    // Only add fields that are present in the update request
    if (updateData.serviceTypeId !== undefined) {
      updateDataFormatted.serviceTypeId = updateData.serviceTypeId;
    }

    if (updateData.status !== undefined) {
      updateDataFormatted.status = updateData.status;
    }

    if (updateData.basePrice !== undefined) {
      updateDataFormatted.basePrice = parseFloat(updateData.basePrice);
    }

    if (updateData.discountPercentage !== undefined) {
      updateDataFormatted.discountPercentage =
        updateData.discountPercentage !== null
          ? parseFloat(updateData.discountPercentage)
          : null;
    }

    // if (updateData.discountAbsolute !== undefined) {
    //   updateDataFormatted.discountAbsolute =
    //     updateData.discountAbsolute !== null
    //       ? parseFloat(updateData.discountAbsolute)
    //       : null;
    // }

    if (updateData.discountValidUntil !== undefined) {
      updateDataFormatted.discountValidUntil =
        updateData.discountValidUntil !== null
          ? new Date(updateData.discountValidUntil)
          : null;
    }

    if (updateData.timeToComplete !== undefined) {
      updateDataFormatted.timeToComplete =
        updateData.timeToComplete !== null
          ? parseInt(updateData.timeToComplete)
          : null;
    }

    if (updateData.availablePriorities !== undefined) {
      updateDataFormatted.availablePriorities = updateData.availablePriorities;
    }

    if (updateData.priorityPrices !== undefined) {
      updateDataFormatted.priorityPrices = updateData.priorityPrices;
    }

    if (updateData.minimumAdvanceBooking !== undefined) {
      updateDataFormatted.minimumAdvanceBooking =
        updateData.minimumAdvanceBooking !== null
          ? parseInt(updateData.minimumAdvanceBooking)
          : null;
    }

    if (updateData.termsAndConditions !== undefined) {
      updateDataFormatted.termsAndConditions = updateData.termsAndConditions;
    }

    if (updateData.paymentPolicy !== undefined) {
      updateDataFormatted.paymentPolicy = updateData.paymentPolicy;
    }

    if (updateData.warrantyDays !== undefined) {
      updateDataFormatted.warrantyDays =
        updateData.warrantyDays !== null
          ? parseInt(updateData.warrantyDays)
          : null;
    }

    if (updateData.warrantyKilometers !== undefined) {
      updateDataFormatted.warrantyKilometers =
        updateData.warrantyKilometers !== null
          ? parseInt(updateData.warrantyKilometers)
          : null;
    }

    if (updateData.isHighlighted !== undefined) {
      updateDataFormatted.isHighlighted = updateData.isHighlighted;
    }

    // if (updateData.hasPickupDropService !== undefined) {
    //   updateDataFormatted.hasPickupDropService =
    //     updateData.hasPickupDropService;
    // }

    // if (updateData.pickupDropFee !== undefined) {
    //   updateDataFormatted.pickupDropFee =
    //     updateData.pickupDropFee !== null
    //       ? parseFloat(updateData.pickupDropFee)
    //       : null;
    // }

    if (updateData.hasEmergencyService !== undefined) {
      updateDataFormatted.hasEmergencyService = updateData.hasEmergencyService;
    }

    if (updateData.emergencyServiceFee !== undefined) {
      updateDataFormatted.emergencyServiceFee =
        updateData.emergencyServiceFee !== null
          ? parseFloat(updateData.emergencyServiceFee)
          : null;
    }

    // Update with the formatted data
    const updatedOffering = await prisma.serviceCenterOffering.update({
      where: {
        serviceCenterOfferingId,
      },
      data: updateDataFormatted,
    });

    logger.info({
      message: 'Service center offering updated successfully',
      metadata: {
        serviceCenterOfferingId,
        serviceCenterId,
      },
    });

    return updatedOffering;
  } catch (error) {
    logger.error({
      message: 'Error updating service center offering',
      metadata: {
        serviceCenterId,
        serviceCenterOfferingId,
        errorName: error.name,
        errorMessage: error.message,
        errorCode: error.code,
        stack: error.stack,
      },
    });

    if (error instanceof AppError) throw error;

    // Handle specific Prisma errors
    if (error.code === 'P2025') {
      throw new AppError(
        `Service center offering not found with ID: ${serviceCenterOfferingId}`,
        404,
      );
    }

    if (error.code === 'P2003') {
      throw new AppError(
        `Foreign key constraint failed: ${error.meta?.field_name}`,
        404,
      );
    }

    throw new AppError(
      `Failed to update service center offering: ${error.message}`,
      500,
    );
  }
};
