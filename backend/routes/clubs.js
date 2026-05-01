const express = require('express');
const router = express.Router();
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { createMemoryUpload } = require('../middleware/uploads');
const { createRateLimiter } = require('../middleware/rateLimit');
const clubsController = require('../controllers/clubsController');

const upload = createMemoryUpload();
const writeLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: 'Too many requests, please try again later' }
});

router.get('/', clubsController.listClubs);
router.post(
  '/',
  authMiddleware,
  requireAdmin('Not authorized to add club recruitments.'),
  writeLimiter,
  upload.single('image'),
  clubsController.createClub
);
router.put(
  '/:id',
  authMiddleware,
  requireAdmin('Only admin can edit club recruitments.'),
  writeLimiter,
  upload.single('image'),
  clubsController.updateClub
);
router.delete(
  '/:id',
  authMiddleware,
  requireAdmin('Only admin can delete club recruitments.'),
  clubsController.deleteClub
);

module.exports = router;
