const express = require('express');
const router = express.Router();
const componentController = require('../controllers/componentController');
const validationMiddleware = require('../middlewares/validationMiddleware');

router.post(
  '/',
  validationMiddleware.validateComponent,
  componentController.createComponent,
);

router
  .route('/:id')
  .patch(
    validationMiddleware.validateComponentUpdate,
    componentController.updateComponent,
  )
  .delete(componentController.deleteComponent);

module.exports = router;
