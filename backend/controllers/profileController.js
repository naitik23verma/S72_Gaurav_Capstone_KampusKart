const profileService = require('../services/profileService');
const { handleServiceError } = require('./controllerUtils');

const getProfile = async (req, res) => {
  try {
    const user = await profileService.getProfile(req.user._id);
    res.json(user);
  } catch (error) {
    handleServiceError(res, error, 'Server Error');
  }
};

const updateProfile = async (req, res) => {
  try {
    const updatedUser = await profileService.updateProfile({
      userId: req.user._id,
      data: req.body,
      file: req.file
    });
    res.json(updatedUser);
  } catch (error) {
    handleServiceError(res, error, 'Failed to update profile');
  }
};

module.exports = {
  getProfile,
  updateProfile
};
