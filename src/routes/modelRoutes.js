const express = require('express');
const router = express.Router();
const brandController = require('../controllers/modelController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Create a new model
router.post(
  '/',
  validationMiddleware.validateModel,
  brandController.createModel,
);

// Update a model by id
router.patch(
  '/:id',
  validationMiddleware.validateModelUpdate,
  brandController.updateModel,
);

// Delete a model by id
router.delete('/:id', brandController.deleteModel);

module.exports = router;
