const multer = require('multer');

const createMemoryUpload = ({ maxFileSize } = {}) => {
  const options = { storage: multer.memoryStorage() };
  if (maxFileSize) {
    options.limits = { fileSize: maxFileSize };
  }
  return multer(options);
};

module.exports = { createMemoryUpload };
