const express = require('express');
const router = express.Router();
const Facility = require('../models/Facility');
const auth = require('../middleware/authMiddleware');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const rateLimit = require('express-rate-limit');
const upload = multer({ storage: multer.memoryStorage() });

const writeLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: 'Too many requests, please try again later' }
});

// Get all facilities
router.get('/', async (req, res) => {
  try {
    const { type, search, page, limit } = req.query;
    const query = {};

    if (type && type !== 'All') {
      query.type = type;
    }

    if (search && typeof search === 'string') {
      const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query.$or = [
        { name: { $regex: escaped, $options: 'i' } },
        { description: { $regex: escaped, $options: 'i' } },
        { location: { $regex: escaped, $options: 'i' } },
      ];
    }

    if (page !== undefined && limit !== undefined) {
      const parsedPage = Math.max(1, parseInt(page, 10) || 1);
      const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 9));
      const skip = (parsedPage - 1) * parsedLimit;
      const total = await Facility.countDocuments(query);
      const facilities = await Facility.find(query).sort({ createdAt: -1 }).skip(skip).limit(parsedLimit);
      return res.json({ facilities, totalItems: total, totalPages: Math.ceil(total / parsedLimit) });
    }

    const facilities = await Facility.find(query).sort({ createdAt: -1 });
    res.json(facilities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a facility (admin only)
router.post('/', auth, writeLimiter, upload.array('images', 5), async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, description, location, type, icon } = req.body;
    const images = [];

    // Upload images to Cloudinary if any
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'facilities',
          resource_type: 'auto'
        });
        images.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    }

    const facility = new Facility({
      name,
      description,
      location,
      type,
      icon,
      images
    });

    const savedFacility = await facility.save();
    res.status(201).json(savedFacility);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a facility (admin only)
router.put('/:id', auth, writeLimiter, upload.array('images', 5), async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, description, location, type, icon, keepImages } = req.body;
    const facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    // Handle images
    let images = [];
    if (keepImages) {
      try {
        const keepPublicIds = JSON.parse(keepImages);
        images = facility.images.filter(img => keepPublicIds.includes(img.public_id));
      } catch (e) {
        // If JSON parse fails, keep all existing images to avoid data loss
        images = [...facility.images];
      }
    } else {
      // No keepImages provided means keep all existing images
      images = [...facility.images];
    }

    // Upload new images
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        const dataURI = `data:${file.mimetype};base64,${b64}`;
        const result = await cloudinary.uploader.upload(dataURI, {
          folder: 'facilities',
          resource_type: 'auto'
        });
        images.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    }

    // Delete removed images from Cloudinary
    const removedImages = facility.images.filter(img => !images.some(newImg => newImg.public_id === img.public_id));
    for (const img of removedImages) {
      try {
        await cloudinary.uploader.destroy(img.public_id);
      } catch (err) {
        console.error('Error deleting facility image from Cloudinary:', err);
      }
    }

    facility.name = name;
    facility.description = description;
    facility.location = location;
    facility.type = type;
    facility.icon = icon;
    facility.images = images;

    const updatedFacility = await facility.save();
    res.json(updatedFacility);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a facility (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    // Delete images from Cloudinary
    for (const img of facility.images) {
      try {
        await cloudinary.uploader.destroy(img.public_id);
      } catch (err) {
        console.error('Error deleting facility image from Cloudinary:', err);
      }
    }

    await facility.deleteOne();
    res.json({ message: 'Facility deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 