const express = require('express');
const router = express.Router();
const { authMiddleware, requireAdmin } = require('../middleware/auth');
const { sanitizeInput, validateComplaint } = require('../middleware/validation');
const { createMemoryUpload } = require('../middleware/uploads');
const complaintsController = require('../controllers/complaintsController');

const upload = createMemoryUpload();

router.get('/', authMiddleware, complaintsController.listComplaints);
router.post(
  '/',
  authMiddleware,
  upload.array('images', 5),
  sanitizeInput,
  validateComplaint,
  complaintsController.createComplaint
);

router.get(
  '/admin/all',
  authMiddleware,
  requireAdmin('Admin access required'),
  complaintsController.listAdminComplaints
);
router.delete(
  '/admin/:id/permanent',
  authMiddleware,
  requireAdmin('Admin access required'),
  complaintsController.adminPermanentDelete
);
router.patch(
  '/admin/:id/restore',
  authMiddleware,
  requireAdmin('Admin access required'),
  complaintsController.adminRestoreComplaint
);
router.post(
  '/admin/cleanup-expired',
  authMiddleware,
  requireAdmin('Admin access required'),
  complaintsController.adminCleanupExpired
);

router.put('/:id', authMiddleware, upload.array('images', 5), complaintsController.updateComplaint);
router.delete('/:id', authMiddleware, complaintsController.deleteComplaint);

module.exports = router;
