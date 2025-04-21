const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Create a new category
router.post(
  '/',
  validationMiddleware.validateCategory,
  categoryController.createCategory,
);

// Update a category
router.patch(
  '/:id',
  validationMiddleware.validateCategoryUpdate,
  categoryController.updateCategory,
);

// Delete a category
router.delete('/:id', categoryController.deleteCategory);

// Bulk create categories
router.post(
  '/bulk',
  validationMiddleware.validateBulkCategories,
  categoryController.bulkCreateCategories,
);

module.exports = router;
