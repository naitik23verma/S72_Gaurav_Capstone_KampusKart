const express = require('express');
const router = express.Router();
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { createMemoryUpload } = require('../middleware/uploads');
const { createRateLimiter } = require('../middleware/rateLimit');
const newsController = require('../controllers/newsController');

const upload = createMemoryUpload();
const writeLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: 'Too many requests, please try again later' }
});

router.get('/', newsController.listNews);
router.post(
  '/',
  authMiddleware,
  requireAdmin('Not authorized to add news.'),
  writeLimiter,
  upload.array('images', 5),
  newsController.createNews
);
router.put(
  '/:id',
  authMiddleware,
  requireAdmin('Only admin can edit news.'),
  writeLimiter,
  upload.array('images', 5),
  newsController.updateNews
);
router.delete(
  '/:id',
  authMiddleware,
  requireAdmin('Only admin can delete news.'),
  newsController.deleteNews
);

module.exports = router;
