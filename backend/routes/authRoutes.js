const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getMe,
  updateProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

/**
 * Authentication Routes
 */

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @body    name, email, password, role (optional)
 * @access  Public
 */
router.post('/register', register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @body    email, password
 * @access  Public
 */
router.post('/login', login);

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
router.get('/me', protect, getMe);

/**
 * @route   PUT /api/auth/profile
 * @desc    Update user profile
 * @body    name, avatar
 * @access  Private
 */
router.put('/profile', protect, updateProfile);

module.exports = router;
