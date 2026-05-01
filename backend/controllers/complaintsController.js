const complaintsService = require('../services/complaintsService');
const { handleServiceError } = require('./controllerUtils');

const listComplaints = async (req, res) => {
  try {
    const result = await complaintsService.listComplaints(req.query);
    res.json({
      complaints: result.complaints,
      totalItems: result.totalItems,
      totalPages: result.totalPages
    });
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const createComplaint = async (req, res) => {
  try {
    const complaint = await complaintsService.createComplaint({
      userId: req.user._id,
      data: req.body,
      files: req.files
    });
    res.status(201).json(complaint);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const updateComplaint = async (req, res) => {
  try {
    const complaint = await complaintsService.updateComplaint({
      complaintId: req.params.id,
      userId: req.user._id,
      isAdmin: req.user.isAdmin,
      data: req.body,
      files: req.files
    });
    res.json(complaint);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const result = await complaintsService.deleteComplaint({
      complaintId: req.params.id,
      userId: req.user._id,
      isAdmin: req.user.isAdmin
    });
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const listAdminComplaints = async (req, res) => {
  try {
    const result = await complaintsService.listAdminComplaints(req.query);
    res.json({
      complaints: result.complaints,
      totalItems: result.totalItems,
      totalPages: result.totalPages
    });
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const adminRestoreComplaint = async (req, res) => {
  try {
    const result = await complaintsService.adminRestoreComplaint(req.params.id);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const adminPermanentDelete = async (req, res) => {
  try {
    const result = await complaintsService.adminPermanentDelete(req.params.id);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

const adminCleanupExpired = async (req, res) => {
  try {
    const result = await complaintsService.adminCleanupExpired();
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, error.message);
  }
};

module.exports = {
  listComplaints,
  createComplaint,
  updateComplaint,
  deleteComplaint,
  listAdminComplaints,
  adminRestoreComplaint,
  adminPermanentDelete,
  adminCleanupExpired
};
