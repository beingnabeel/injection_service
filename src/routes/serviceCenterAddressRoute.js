const express = require('express');
const router = express.Router();
const serviceCenterAddressController = require('../controllers/serviceCenterAddressController');

// Create a new service center address
router.post(
  '/:serviceCenterId',
  // validationMiddleware.validateAddress,
  serviceCenterAddressController.createServiceCenterAddress,
);

// Update a service center address by id
router.patch(
  '/:serviceCenterId',
  //   validationMiddleware.validateAddress,
  serviceCenterAddressController.updateServiceCenterAddress,
);

// Delete a service center address by id\
router.delete(
  '/:serviceCenterId',
  serviceCenterAddressController.deleteServiceCenterAddress,
);

module.exports = router;
