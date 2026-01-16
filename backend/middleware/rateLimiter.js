const rateLimit = require('express-rate-limit');

/**
 * Rate Limiting Middleware
 * Prevents abuse and DDoS attacks
 */

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes.'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Strict limiter for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: {
    success: false,
    message: 'Too many authentication attempts, please try again after 15 minutes.'
  },
  skipSuccessfulRequests: true, // Don't count successful requests
});

// Limiter for file uploads
const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 uploads per hour
  message: {
    success: false,
    message: 'Too many file uploads, please try again after an hour.'
  },
});

// Limiter for item creation
const createItemLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit each IP to 20 item creations per hour
  message: {
    success: false,
    message: 'Too many items created, please try again after an hour.'
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
  uploadLimiter,
  createItemLimiter
};
