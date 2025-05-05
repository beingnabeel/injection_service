const { prisma } = require('../models');
const AppError = require('../utils/appError');

// create service center slot
exports.createServiceCenterSlot = async (data) => {
  return await prisma.slot.create({
    data,
  });
};

// update service center slot by id
exports.updateServiceCenterSlot = async (id, data) => {
  const slot = await prisma.slot.findUnique({ where: { id } });

  if (!slot) {
    throw new AppError(`No slot found with ID: ${id}`, 404);
  }

  return await prisma.slot.update({
    where: { id },
    data,
  });
};

// delete service center slot by id
exports.deleteServiceCenterSlot = async (id) => {
  const slot = await prisma.slot.findUnique({
    where: { id: id },
  });

  if (!slot) {
    throw new AppError(`No slot found with ID: ${id}`, 404);
  }

  return await prisma.slot.delete({
    where: { id: id },
  });
};
