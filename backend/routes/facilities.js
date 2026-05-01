const express = require('express');
const router = express.Router();
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { createMemoryUpload } = require('../middleware/uploads');
const { createRateLimiter } = require('../middleware/rateLimit');
const facilitiesController = require('../controllers/facilitiesController');

const upload = createMemoryUpload();
const writeLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: 'Too many requests, please try again later' }
});

router.get('/', facilitiesController.listFacilities);
router.post(
  '/',
  authMiddleware,
  requireAdmin('Not authorized'),
  writeLimiter,
  upload.array('images', 5),
  facilitiesController.createFacility
);
router.put(
  '/:id',
  authMiddleware,
  requireAdmin('Not authorized'),
  writeLimiter,
  upload.array('images', 5),
  facilitiesController.updateFacility
);
router.delete(
  '/:id',
  authMiddleware,
  requireAdmin('Not authorized'),
  facilitiesController.deleteFacility
);

module.exports = router;
