const express = require('express');
const router = express.Router();

const serviceCenterController = require('../controllers/serviceCenterController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Routes for managing service center offerings

// Create a new service center offering
router.post(
  '/:serviceCenterId/offerings',
  validationMiddleware.validateServiceCenterOffering,
  serviceCenterController.createServiceCenterOffering,
);

// Update an existing service center offering
router.patch(
  '/:serviceCenterId/offerings/:serviceCenterOfferingId',
  validationMiddleware.validateUpdateServiceCenterOffering,
  serviceCenterController.updateServiceCenterOffering,
);

// Create a new service center
router.post(
  '/',
  validationMiddleware.validateServiceCenter,
  serviceCenterController.createServiceCenter,
);

// Update a service center by id
router.patch(
  '/:id',
  validationMiddleware.validateServiceCenterUpdate,
  serviceCenterController.updateServiceCenter,
);

// Delete a service center by id
router.delete('/:id', serviceCenterController.deleteServiceCenter);

module.exports = router;
