const express = require('express');
const router = express.Router();
const serviceCenterOperatingHourController = require('../controllers/serviceCenterOperatingHourController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Create a new service center operating hour
router.post(
  '/',
  validationMiddleware.validateOperatingHours,
  serviceCenterOperatingHourController.createServiceCenterOperatingHour,
);

// Update a service center operating hour by id
router.patch(
  '/:id',
  //   validationMiddleware.validateOperatingHoursUpdate,
  serviceCenterOperatingHourController.updateServiceCenterOperatingHour,
);

// Delete a service center operating hour by id
router.delete(
  '/:id',
  serviceCenterOperatingHourController.deleteServiceCenterOperatingHour,
);

module.exports = router;
