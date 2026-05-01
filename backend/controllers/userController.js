const userService = require('../services/userService');
const { handleServiceError } = require('./controllerUtils');

const getProfile = async (req, res) => {
  try {
    const result = await userService.getUserProfile(req.user._id);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, 'Error fetching profile');
  }
};

const updateProfile = async (req, res) => {
  try {
    const result = await userService.updateUserProfile(req.user._id, req.body);
    res.json(result);
  } catch (error) {
    handleServiceError(res, error, 'Error updating profile');
  }
};

module.exports = {
  getProfile,
  updateProfile
};
