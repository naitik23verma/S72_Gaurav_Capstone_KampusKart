const { ServiceError } = require('../services/serviceError');

const handleServiceError = (res, error, fallbackMessage) => {
  if (error instanceof ServiceError || error.status) {
    return res.status(error.status || 500).json({ message: error.message });
  }

  return res.status(500).json({ message: fallbackMessage || 'Server Error' });
};

module.exports = { handleServiceError };
