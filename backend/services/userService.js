const userRepository = require('../repositories/userRepository');
const { ServiceError } = require('./serviceError');

const getUserProfile = async (userId) => {
  const user = await userRepository.findById(userId).select('-password');
  if (!user) {
    throw new ServiceError('User not found', 404);
  }

  return {
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      phone: user.phone
    }
  };
};

const updateUserProfile = async (userId, updates) => {
  const allowedUpdates = ['name', 'phone'];
  const updateKeys = Object.keys(updates || {});
  const isValidOperation = updateKeys.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    throw new ServiceError('Invalid updates', 400);
  }

  const updateData = {};
  updateKeys.forEach((update) => {
    updateData[update] = updates[update];
  });

  const updatedUser = await userRepository.updateById(
    userId,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');

  if (!updatedUser) {
    throw new ServiceError('User not found', 404);
  }

  return {
    user: {
      id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      phone: updatedUser.phone
    }
  };
};

module.exports = { getUserProfile, updateUserProfile };
