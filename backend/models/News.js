const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  images: [
    {
      public_id: String,
      url: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Add indexes for frequently queried fields
newsSchema.index({ date: -1 });
newsSchema.index({ category: 1 });
newsSchema.index({ createdAt: -1 });
newsSchema.index({ category: 1, date: -1 }); // Compound index for filtered queries

module.exports = mongoose.model('News', newsSchema); 