const express = require('express');
const router = express.Router();
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { createMemoryUpload } = require('../middleware/uploads');
const { createRateLimiter } = require('../middleware/rateLimit');
const chatController = require('../controllers/chatController');

const upload = createMemoryUpload({ maxFileSize: 5 * 1024 * 1024 });
const messageLimiter = createRateLimiter({
  windowMs: 60 * 1000,
  max: 30,
  message: { message: 'Too many messages, please slow down' }
});

router.get('/messages', authMiddleware, chatController.listMessages);
router.get('/search', authMiddleware, chatController.searchMessages);
router.post(
  '/messages',
  authMiddleware,
  messageLimiter,
  upload.array('attachments', 5),
  chatController.sendMessage
);
router.patch('/messages/:messageId', authMiddleware, chatController.editMessage);
router.delete('/messages/:messageId', authMiddleware, chatController.deleteMessage);
router.delete(
  '/messages/:messageId/permanent',
  authMiddleware,
  requireAdmin('Only admins can permanently delete messages'),
  chatController.deleteMessagePermanent
);
router.post('/messages/:messageId/reactions', authMiddleware, chatController.addReaction);
router.post('/messages/:messageId/read', authMiddleware, chatController.markRead);
router.post(
  '/cleanup-orphaned-attachments',
  authMiddleware,
  requireAdmin('Only admins can run cleanup operations'),
  chatController.cleanupOrphanedAttachments
);

module.exports = router;
