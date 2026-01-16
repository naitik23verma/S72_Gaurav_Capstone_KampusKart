const Joi = require('joi');

/**
 * Validation Middleware
 * Validates request body, params, and query using Joi schemas
 */

// User registration validation
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name must not exceed 50 characters'
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters'
  }),
  role: Joi.string().valid('student', 'admin').default('student')
});

// User login validation
const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required'
  })
});

// Lost & Found item validation
const itemSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title must not exceed 100 characters'
  }),
  description: Joi.string().min(10).required().messages({
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters'
  }),
  category: Joi.string().valid(
    'Electronics',
    'Clothing',
    'Books',
    'Keys',
    'Accessories',
    'Documents',
    'Sports',
    'Other'
  ).required().messages({
    'any.only': 'Invalid category',
    'string.empty': 'Category is required'
  }),
  type: Joi.string().valid('lost', 'found').required().messages({
    'any.only': 'Type must be either "lost" or "found"',
    'string.empty': 'Type is required'
  }),
  location: Joi.string().max(200).allow('').optional(),
  lastSeenDate: Joi.date().max('now').optional(),
  contactInfo: Joi.string().max(200).allow('').optional(),
  imageURL: Joi.string().uri().allow('').optional(),
  status: Joi.string().valid('open', 'resolved').optional()
});

// Item update validation (partial)
const itemUpdateSchema = Joi.object({
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().min(10).optional(),
  category: Joi.string().valid(
    'Electronics',
    'Clothing',
    'Books',
    'Keys',
    'Accessories',
    'Documents',
    'Sports',
    'Other'
  ).optional(),
  type: Joi.string().valid('lost', 'found').optional(),
  location: Joi.string().max(200).allow('').optional(),
  lastSeenDate: Joi.date().max('now').optional(),
  contactInfo: Joi.string().max(200).allow('').optional(),
  imageURL: Joi.string().uri().allow('').optional(),
  status: Joi.string().valid('open', 'resolved').optional()
}).min(1); // At least one field must be provided

// Profile update validation
const profileUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  avatar: Joi.string().uri().allow('').optional()
}).min(1);

// MongoDB ObjectId validation
const objectIdSchema = Joi.string().regex(/^[0-9a-fA-F]{24}$/).messages({
  'string.pattern.base': 'Invalid ID format'
});

// Query parameters validation
const querySchema = Joi.object({
  limit: Joi.number().integer().min(1).max(100).default(20),
  page: Joi.number().integer().min(1).default(1),
  category: Joi.string().valid(
    'Electronics',
    'Clothing',
    'Books',
    'Keys',
    'Accessories',
    'Documents',
    'Sports',
    'Other'
  ).optional(),
  status: Joi.string().valid('open', 'resolved').optional(),
  type: Joi.string().valid('lost', 'found').optional(),
  search: Joi.string().max(100).optional()
});

/**
 * Validation middleware factory
 * @param {Joi.Schema} schema - Joi validation schema
 * @param {string} property - Property to validate ('body', 'params', 'query')
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false, // Return all errors
      stripUnknown: true // Remove unknown fields
    });

    if (error) {
      const errors = error.details.map(detail => ({
        field: detail.path.join('.'),
        message: detail.message
      }));

      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    // Replace request property with validated value
    req[property] = value;
    next();
  };
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  itemSchema,
  itemUpdateSchema,
  profileUpdateSchema,
  objectIdSchema,
  querySchema
};
