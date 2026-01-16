const express = require('express');
const router = express.Router();
const {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  verifyUserPassword
} = require('../controllers/userController');

/**
 * Test Routes for User Operations
 * These routes are for testing database operations
 * In production, these would be protected and use proper authentication
 */

/**
 * @route   POST /api/test/users/create
 * @desc    Create a new user (for testing)
 * @access  Public (should be protected in production)
 */
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password'
      });
    }

    // Create user
    const user = await createUser(name, email, password, role);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/test/users/:id
 * @desc    Get user by ID
 * @access  Public (should be protected in production)
 */
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/test/users/email/:email
 * @desc    Get user by email
 * @access  Public (should be protected in production)
 */
router.get('/email/:email', async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/test/users
 * @desc    Get all users (limited to 10)
 * @access  Public (should be protected in production)
 */
router.get('/', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const users = await getAllUsers(limit);

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   POST /api/test/users/verify
 * @desc    Verify user password (for testing login)
 * @access  Public (should be protected in production)
 */
router.post('/verify', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    const user = await verifyUserPassword(email, password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    res.json({
      success: true,
      message: 'Password verified successfully',
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
