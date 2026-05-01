const lostfoundService = require('../services/lostfoundService');
const { handleServiceError } = require('./controllerUtils');

const createItem = async (req, res) => {
  try {
    const item = await lostfoundService.createItem({
      userId: req.user._id,
      data: req.body,
      files: req.files
    });
    res.status(201).json(item);
  } catch (error) {
    handleServiceError(res, error, 'Error creating item');
  }
};

const getSuggestions = async (req, res) => {
  try {
    const suggestions = await lostfoundService.getSuggestions({ query: req.query.query });
    res.status(200).json(suggestions);
  } catch (error) {
    handleServiceError(res, error, 'Error fetching suggestions');
  }
};

const listItems = async (req, res) => {
  try {
    const result = await lostfoundService.listItems(req.query);
    res.status(200).json({
      items: result.items,
      totalItems: result.totalItems,
      totalPages: result.totalPages
    });
  } catch (error) {
    handleServiceError(res, error, 'Error fetching items');
  }
};

const listAdminItems = async (req, res) => {
  try {
    const result = await lostfoundService.listAdminItems(req.query);
    res.json({
      items: result.items,
      totalItems: result.totalItems,
      totalPages: result.totalPages
    });
  } catch (error) {
    handleServiceError(res, error, 'Error fetching items');
  }
};

const getItemById = async (req, res) => {
  try {
    const item = await lostfoundService.getItemById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    handleServiceError(res, error, 'Error fetching item');
  }
};

const updateItem = async (req, res) => {
  try {
    const item = await lostfoundService.updateItem({
      itemId: req.params.id,
      userId: req.user._id,
      isAdmin: req.user.isAdmin,
      data: req.body,
      files: req.files
    });
    res.status(200).json(item);
  } catch (error) {
    handleServiceError(res, error, 'Error updating item');
  }
};

const deleteItem = async (req, res) => {
  try {
    const result = await lostfoundService.deleteItem({
      itemId: req.params.id,
      userId: req.user._id,
      isAdmin: req.user.isAdmin
    });
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(res, error, 'Error deleting item');
  }
};

const resolveItem = async (req, res) => {
  try {
    const result = await lostfoundService.resolveItem({
      itemId: req.params.id,
      userId: req.user._id,
      isAdmin: req.user.isAdmin
    });
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(res, error, 'Error marking item as resolved');
  }
};

const adminRestoreItem = async (req, res) => {
  try {
    const result = await lostfoundService.adminRestoreItem(req.params.id);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, 'Error restoring item');
  }
};

const adminPermanentDelete = async (req, res) => {
  try {
    const result = await lostfoundService.adminPermanentDelete(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    handleServiceError(res, error, 'Error permanently deleting item');
  }
};

const adminCleanupExpired = async (req, res) => {
  try {
    const result = await lostfoundService.adminCleanupExpired();
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, 'Error during manual cleanup');
  }
};

module.exports = {
  createItem,
  getSuggestions,
  listItems,
  listAdminItems,
  getItemById,
  updateItem,
  deleteItem,
  resolveItem,
  adminRestoreItem,
  adminPermanentDelete,
  adminCleanupExpired
};
