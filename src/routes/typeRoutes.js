const express = require('express');
const router = express.Router();
const typeController = require('../controllers/typeController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Create a new service type
router.post('/', validationMiddleware.validateType, typeController.createType);

// Update a service type
router.patch(
  '/:id',
  validationMiddleware.validateType,
  typeController.updateType,
);

// Delete a service type
router.delete('/:id', typeController.deleteType);

// Bulk create service types
router.post(
  '/bulk',
  validationMiddleware.validateBulkTypes,
  typeController.bulkCreateTypes,
);

// Associate a component with a service type
router.post(
  '/:serviceTypeId/components',
  validationMiddleware.validateTypeComponent,
  typeController.associateComponentWithType,
);

// // Get all components associated with a service type
router.get('/:serviceTypeId/components', typeController.getComponentsByTypeId);

// Remove a component from a service type
router.delete(
  '/:serviceTypeId/components/:serviceComponentId',
  typeController.removeComponentFromType,
);

module.exports = router;
