const rateLimit = require('express-rate-limit');

const createRateLimiter = ({ windowMs, max, message }) => {
  return rateLimit({ windowMs, max, message });
};

module.exports = { createRateLimiter };
