const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brandController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Create a new brand
router.post(
  '/',
  validationMiddleware.validateBrand,
  brandController.createBrand,
);

// Update a brand by id
router.put(
  '/:id',
  validationMiddleware.validateBrandUpdate,
  brandController.updateBrand,
);

// Delete a brand by id
router.delete('/:id', brandController.deleteBrand);

module.exports = router;
