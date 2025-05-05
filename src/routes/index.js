const express = require('express');
const router = express.Router();
const categoryRoutes = require('./categoryRoutes');
const typeRoutes = require('./typeRoutes');

const componentRoutes = require('./componentRoutes');
const serviceCenterRoutes = require('./serviceCenterRoutes');
const serviceCenterAddressRoutes = require('./serviceCenterAddressRoute');
const serviceCenterOperatingHourRoutes = require('./serviceCenterOperatingHourRoute');
const serviceCenterSlotRoutes = require('./serviceCenterSlotRoute');
const brandRoutes = require('./brandRoutes');
const modelRoutes = require('./modelRoutes');
// Mount specific entity routes
router.use('/api/v1/categories', categoryRoutes);
router.use('/api/v1/types', typeRoutes);
router.use('/api/v1/components', componentRoutes);
router.use('/api/v1/service-centers', serviceCenterRoutes);
router.use('/api/v1/brands', brandRoutes);
router.use('/api/v1/models', modelRoutes);
router.use('/api/v1/service-center-addresses', serviceCenterAddressRoutes);
router.use(
  '/api/v1/service-center-operating-hours',
  serviceCenterOperatingHourRoutes,
);
router.use('/api/v1/service-center-slot', serviceCenterSlotRoutes);

module.exports = router;
