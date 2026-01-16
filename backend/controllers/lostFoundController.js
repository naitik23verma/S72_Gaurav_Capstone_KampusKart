const LostFound = require('../models/LostFound');

/**
 * LostFound Controller
 * Handles all lost & found item operations
 */

/**
 * Get all lost & found items
 * @param {Object} filters - Optional filters (category, status, type)
 * @param {number} limit - Maximum number of items to return
 * @param {number} skip - Number of items to skip (for pagination)
 * @returns {Promise<Array>} Array of items
 */
const getAllLostFound = async (filters = {}, limit = 20, skip = 0) => {
  try {
    // Build query
    const query = { isActive: true };
    
    if (filters.category) {
      query.category = filters.category;
    }
    
    if (filters.status) {
      query.status = filters.status;
    }
    
    if (filters.type) {
      query.type = filters.type;
    }
    
    // Search by title or description
    if (filters.search) {
      query.$or = [
        { title: { $regex: filters.search, $options: 'i' } },
        { description: { $regex: filters.search, $options: 'i' } }
      ];
    }

    // Execute query
    const items = await LostFound.find(query)
      .populate('createdBy', 'name email role avatar')
      .sort({ createdAt: -1 }) // Most recent first
      .limit(limit)
      .skip(skip);

    // Get total count for pagination
    const total = await LostFound.countDocuments(query);

    return {
      items,
      total,
      page: Math.floor(skip / limit) + 1,
      pages: Math.ceil(total / limit)
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Get single lost & found item by ID
 * @param {string} id - Item's MongoDB ObjectId
 * @returns {Promise<Object|null>} Item object or null if not found
 */
const getLostFoundById = async (id) => {
  try {
    const item = await LostFound.findById(id)
      .populate('createdBy', 'name email role avatar');
    
    return item;
  } catch (error) {
    throw error;
  }
};

/**
 * Get items by user ID
 * @param {string} userId - User's MongoDB ObjectId
 * @param {number} limit - Maximum number of items
 * @returns {Promise<Array>} Array of user's items
 */
const getItemsByUser = async (userId, limit = 10) => {
  try {
    const items = await LostFound.find({ 
      createdBy: userId,
      isActive: true 
    })
      .sort({ createdAt: -1 })
      .limit(limit);
    
    return items;
  } catch (error) {
    throw error;
  }
};

/**
 * Get recent items
 * @param {number} limit - Maximum number of items
 * @returns {Promise<Array>} Array of recent items
 */
const getRecentItems = async (limit = 10) => {
  try {
    const items = await LostFound.find({ isActive: true })
      .populate('createdBy', 'name email role avatar')
      .sort({ createdAt: -1 })
      .limit(limit);
    
    return items;
  } catch (error) {
    throw error;
  }
};

/**
 * Get items by category
 * @param {string} category - Category to filter by
 * @param {number} limit - Maximum number of items
 * @returns {Promise<Array>} Array of items in category
 */
const getItemsByCategory = async (category, limit = 10) => {
  try {
    const items = await LostFound.getByCategory(category, limit);
    return items;
  } catch (error) {
    throw error;
  }
};

/**
 * Get items by status
 * @param {string} status - Status to filter by (open/resolved)
 * @param {number} limit - Maximum number of items
 * @returns {Promise<Array>} Array of items with status
 */
const getItemsByStatus = async (status, limit = 10) => {
  try {
    const items = await LostFound.getByStatus(status, limit);
    return items;
  } catch (error) {
    throw error;
  }
};

/**
 * Get statistics
 * @returns {Promise<Object>} Statistics object
 */
const getStatistics = async () => {
  try {
    const total = await LostFound.countDocuments({ isActive: true });
    const open = await LostFound.countDocuments({ status: 'open', isActive: true });
    const resolved = await LostFound.countDocuments({ status: 'resolved', isActive: true });
    const lost = await LostFound.countDocuments({ type: 'lost', isActive: true });
    const found = await LostFound.countDocuments({ type: 'found', isActive: true });
    
    // Get today's items
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const newToday = await LostFound.countDocuments({
      createdAt: { $gte: today },
      isActive: true
    });

    return {
      total,
      open,
      resolved,
      lost,
      found,
      newToday
    };
  } catch (error) {
    throw error;
  }
};

/**
 * Create new lost & found item
 * @param {Object} itemData - Item data
 * @returns {Promise<Object>} Created item
 */
const createLostFound = async (itemData) => {
  try {
    const item = await LostFound.create(itemData);
    
    // Populate creator info
    await item.populate('createdBy', 'name email role avatar');
    
    return item;
  } catch (error) {
    throw error;
  }
};

/**
 * Update lost & found item
 * @param {string} id - Item's MongoDB ObjectId
 * @param {Object} updateData - Data to update
 * @returns {Promise<Object|null>} Updated item or null
 */
const updateLostFound = async (id, updateData) => {
  try {
    const item = await LostFound.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email role avatar');
    
    return item;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete lost & found item (soft delete)
 * @param {string} id - Item's MongoDB ObjectId
 * @returns {Promise<Object|null>} Deleted item or null
 */
const deleteLostFound = async (id) => {
  try {
    const item = await LostFound.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    return item;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllLostFound,
  getLostFoundById,
  getItemsByUser,
  getRecentItems,
  getItemsByCategory,
  getItemsByStatus,
  getStatistics,
  createLostFound,
  updateLostFound,
  deleteLostFound
};
