const User = require('../models/User');

/**
 * User Controller
 * Handles all user-related operations
 */

/**
 * Create a new user
 * @param {string} name - User's full name
 * @param {string} email - User's email address
 * @param {string} password - User's password (will be hashed)
 * @param {string} role - User's role (optional, defaults to 'student')
 * @returns {Promise<Object>} Created user object
 */
const createUser = async (name, email, password, role = 'student') => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Create new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      passwordHash: password, // Will be hashed by pre-save middleware
      role
    });

    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Get user by email
 * @param {string} email - User's email address
 * @returns {Promise<Object|null>} User object or null if not found
 */
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Get user by ID
 * @param {string} id - User's MongoDB ObjectId
 * @returns {Promise<Object|null>} User object or null if not found
 */
const getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all users (for testing/admin purposes)
 * @param {number} limit - Maximum number of users to return
 * @returns {Promise<Array>} Array of user objects
 */
const getAllUsers = async (limit = 10) => {
  try {
    const users = await User.find()
      .limit(limit)
      .sort({ createdAt: -1 }); // Most recent first
    return users;
  } catch (error) {
    throw error;
  }
};

/**
 * Update user by ID
 * @param {string} id - User's MongoDB ObjectId
 * @param {Object} updates - Fields to update
 * @returns {Promise<Object|null>} Updated user object
 */
const updateUser = async (id, updates) => {
  try {
    // Don't allow direct password updates through this method
    if (updates.passwordHash || updates.password) {
      throw new Error('Use password reset method to update password');
    }

    const user = await User.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete user by ID (soft delete - sets isActive to false)
 * @param {string} id - User's MongoDB ObjectId
 * @returns {Promise<Object|null>} Deleted user object
 */
const deleteUser = async (id) => {
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return user;
  } catch (error) {
    throw error;
  }
};

/**
 * Verify user password
 * @param {string} email - User's email
 * @param {string} password - Password to verify
 * @returns {Promise<Object|null>} User object if password is correct, null otherwise
 */
const verifyUserPassword = async (email, password) => {
  try {
    // Need to explicitly select password field
    const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
    
    if (!user) {
      return null;
    }

    // Use the comparePassword method from User model
    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return null;
    }

    // Return user without password
    return await User.findById(user._id);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  verifyUserPassword
};
