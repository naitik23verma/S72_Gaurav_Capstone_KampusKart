const express = require('express');
const router = express.Router();
const passport = require('../config/passport');
const {
  register,
  login,
  getMe,
  updateProfile,
  googleCallback
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

/**
 * @route   GET /api/auth/google
 * @desc    Initiate Google OAuth
 * @access  Public
 */
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

/**
 * @route   GET /api/auth/google/callback
 * @desc    Google OAuth callback
 * @access  Public
 */
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/auth/google/failure',
    session: false
  }),
  googleCallback
);

/**
 * @route   GET /api/auth/google/failure
 * @desc    Google OAuth failure handler
 * @access  Public
 */
router.get('/google/failure', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'Google authentication failed'
  });
});

module.exports = router;
