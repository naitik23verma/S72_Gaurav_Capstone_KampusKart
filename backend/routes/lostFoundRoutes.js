const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/lostFoundController');

/**
 * Lost & Found Routes
 * GET endpoints for retrieving items
 */

/**
 * @route   GET /api/lost-found
 * @desc    Get all lost & found items with optional filters
 * @query   category, status, type, search, limit, page
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { category, status, type, search, limit = 20, page = 1 } = req.query;
    
    // Build filters
    const filters = {};
    if (category) filters.category = category;
    if (status) filters.status = status;
    if (type) filters.type = type;
    if (search) filters.search = search;
    
    // Calculate skip for pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Get items
    const result = await getAllLostFound(filters, parseInt(limit), skip);
    
    res.json({
      success: true,
      count: result.items.length,
      total: result.total,
      page: result.page,
      pages: result.pages,
      data: result.items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/lost-found/recent
 * @desc    Get recent items
 * @query   limit
 * @access  Public
 */
router.get('/recent', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const items = await getRecentItems(limit);
    
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/lost-found/statistics
 * @desc    Get statistics
 * @access  Public
 */
router.get('/statistics', async (req, res) => {
  try {
    const stats = await getStatistics();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/lost-found/category/:category
 * @desc    Get items by category
 * @param   category - Category name
 * @query   limit
 * @access  Public
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const items = await getItemsByCategory(category, limit);
    
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/lost-found/status/:status
 * @desc    Get items by status
 * @param   status - Status (open/resolved)
 * @query   limit
 * @access  Public
 */
router.get('/status/:status', async (req, res) => {
  try {
    const { status } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const items = await getItemsByStatus(status, limit);
    
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/lost-found/user/:userId
 * @desc    Get items by user
 * @param   userId - User's MongoDB ObjectId
 * @query   limit
 * @access  Public (should be protected in production)
 */
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const items = await getItemsByUser(userId, limit);
    
    res.json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   GET /api/lost-found/:id
 * @desc    Get single item by ID
 * @param   id - Item's MongoDB ObjectId
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const item = await getLostFoundById(req.params.id);
    
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    
    res.json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   POST /api/lost-found
 * @desc    Create new lost & found item
 * @body    title, description, category, type, location, lastSeenDate, contactInfo, createdBy
 * @access  Public (should be protected in production)
 */
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      type,
      location,
      lastSeenDate,
      contactInfo,
      imageURL,
      createdBy
    } = req.body;

    // Validate required fields
    if (!title || !description || !category || !type || !createdBy) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: title, description, category, type, createdBy'
      });
    }

    // Create item
    const item = await createLostFound({
      title,
      description,
      category,
      type,
      location,
      lastSeenDate,
      contactInfo,
      imageURL,
      createdBy
    });

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   PUT /api/lost-found/:id
 * @desc    Update lost & found item
 * @param   id - Item's MongoDB ObjectId
 * @body    Fields to update
 * @access  Public (should be protected in production)
 */
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow updating createdBy
    delete updateData.createdBy;

    const item = await updateLostFound(id, updateData);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

/**
 * @route   DELETE /api/lost-found/:id
 * @desc    Delete lost & found item (soft delete)
 * @param   id - Item's MongoDB ObjectId
 * @access  Public (should be protected in production)
 */
router.delete('/:id', async (req, res) => {
  try {
    const item = await deleteLostFound(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully',
      data: item
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
