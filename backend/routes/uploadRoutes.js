const express = require('express');
const router = express.Router();
const { uploadImage, deleteImage } = require('../controllers/uploadController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * Upload Routes
 * Handle image uploads to Cloudinary
 */

/**
 * @route   POST /api/upload
 * @desc    Upload single image
 * @access  Private
 */
router.post('/', protect, upload.single('image'), uploadImage);

/**
 * @route   DELETE /api/upload/:publicId
 * @desc    Delete image from Cloudinary
 * @param   publicId - Cloudinary public ID (URL encoded)
 * @access  Private
 */
router.delete('/:publicId', protect, deleteImage);

module.exports = router;
