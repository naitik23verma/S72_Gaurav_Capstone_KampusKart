const mongoose = require('mongoose');

/**
 * LostFound Schema
 * Represents a lost or found item in the KampusKart system
 */
const lostFoundSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: {
        values: ['wallet', 'keys', 'phone', 'documents', 'electronics', 'clothing', 'books', 'bags', 'other'],
        message: '{VALUE} is not a valid category'
      }
    },
    status: {
      type: String,
      enum: ['open', 'resolved'],
      default: 'open'
    },
    type: {
      type: String,
      required: [true, 'Please specify if item is lost or found'],
      enum: {
        values: ['lost', 'found'],
        message: '{VALUE} is not a valid type'
      }
    },
    imageURL: {
      type: String,
      default: null
    },
    location: {
      type: String,
      trim: true,
      maxlength: [100, 'Location cannot be more than 100 characters']
    },
    lastSeenDate: {
      type: Date,
      default: null
    },
    contactInfo: {
      type: String,
      trim: true,
      maxlength: [100, 'Contact info cannot be more than 100 characters']
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Item must be created by a user']
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // Adds createdAt and updatedAt automatically
  }
);

/**
 * Index for faster queries
 */
lostFoundSchema.index({ category: 1, status: 1 });
lostFoundSchema.index({ createdBy: 1 });
lostFoundSchema.index({ createdAt: -1 });

/**
 * Virtual for item ID display
 */
lostFoundSchema.virtual('itemId').get(function () {
  return `LF-${this._id.toString().slice(-8).toUpperCase()}`;
});

/**
 * Ensure virtuals are included in JSON
 */
lostFoundSchema.set('toJSON', { virtuals: true });
lostFoundSchema.set('toObject', { virtuals: true });

/**
 * Method to check if user is owner
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {boolean} - True if user is owner
 */
lostFoundSchema.methods.isOwner = function (userId) {
  return this.createdBy.toString() === userId.toString();
};

/**
 * Static method to get items by category
 * @param {string} category - Category to filter by
 * @param {number} limit - Maximum number of items
 * @returns {Promise<Array>} - Array of items
 */
lostFoundSchema.statics.getByCategory = function (category, limit = 10) {
  return this.find({ category, isActive: true })
    .populate('createdBy', 'name email role')
    .sort({ createdAt: -1 })
    .limit(limit);
};

/**
 * Static method to get items by status
 * @param {string} status - Status to filter by
 * @param {number} limit - Maximum number of items
 * @returns {Promise<Array>} - Array of items
 */
lostFoundSchema.statics.getByStatus = function (status, limit = 10) {
  return this.find({ status, isActive: true })
    .populate('createdBy', 'name email role')
    .sort({ createdAt: -1 })
    .limit(limit);
};

const LostFound = mongoose.model('LostFound', lostFoundSchema);

module.exports = LostFound;
