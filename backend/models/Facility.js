const mongoose = require('mongoose');

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Academic', 'Food', 'Service', 'Accommodation']
  },
  icon: {
    type: String,
    required: true
  },
  images: [{
    url: String,
    public_id: String
  }]
}, {
  timestamps: true
});

// Add indexes for frequently queried fields
facilitySchema.index({ type: 1 });
facilitySchema.index({ name: 1 });
facilitySchema.index({ createdAt: -1 });
facilitySchema.index({ type: 1, name: 1 }); // Compound index for filtered searches

module.exports = mongoose.model('Facility', facilitySchema); 