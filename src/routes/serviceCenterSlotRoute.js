const express = require('express');
const router = express.Router();
const serviceCenterSlotController = require('../controllers/serviceCenterSlotController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Create a new service center slot
router.post(
  '/',
  validationMiddleware.validateSlot,
  serviceCenterSlotController.createServiceCenterSlot,
);

// Update a service center slot by id
router.patch(
  '/:id',
  // validationMiddleware.validateSlotUpdate,
  serviceCenterSlotController.updateServiceCenterSlot,
);

// Delete a service center slot by id
router.delete('/:id', serviceCenterSlotController.deleteServiceCenterSlot);

module.exports = router;
