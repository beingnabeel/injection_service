const express = require('express');
const router = express.Router();
const categoryRoutes = require('./categoryRoutes');
const typeRoutes = require('./typeRoutes');
const writeController = require('../controllers/writeController');
const validationMiddleware = require('../middlewares/validationMiddleware');

// Mount specific entity routes
router.use('/api/v1/categories', categoryRoutes);
router.use('/api/v1/types', typeRoutes);

// Generic write operation routes
router.post(
  '/api/v1/write',
  validationMiddleware.validateWriteRequest,
  writeController.createItem
);

router.patch(
  '/api/v1/write',
  validationMiddleware.validateUpdateRequest,
  writeController.updateItem
);

router.delete(
  '/api/v1/write',
  validationMiddleware.validateDeleteRequest,
  writeController.deleteItem
);

router.post(
  '/api/v1/write/bulk',
  validationMiddleware.validateBulkWriteRequest,
  writeController.bulkCreate
);

module.exports = router;