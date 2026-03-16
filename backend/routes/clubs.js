const express = require('express');
const router = express.Router();
const ClubRecruitment = require('../models/ClubRecruitment');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const storage = multer.memoryStorage();
const upload = multer({ storage });

// GET all club recruitments
router.get('/', async (req, res) => {
  try {
    const clubs = await ClubRecruitment.find().sort({ startDate: -1 });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new club recruitment (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized to add club recruitments.' });
  }

  const { title, description, clubName, startDate, endDate, formUrl, contactInfo, status } = req.body;
  if (!title || !description || !clubName || !startDate || !endDate || !formUrl) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: 'Invalid date format.' });
  }
  if (start >= end) {
    return res.status(400).json({ message: 'Start date must be before end date.' });
  }

  // Validate formUrl
  try {
    new URL(formUrl);
  } catch (e) {
    return res.status(400).json({ message: 'Invalid form URL format.' });
  }

  let image = undefined;
  if (req.file) {
    try {
      const uploadPromise = new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'clubs' },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve({ public_id: result.public_id, url: result.secure_url });
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
      });
      
      image = await uploadPromise;
    } catch (err) {
      return res.status(500).json({ message: 'Cloudinary upload failed', error: err.message });
    }
  }

  try {
    let parsedContactInfo;
    if (contactInfo) {
      try {
        parsedContactInfo = JSON.parse(contactInfo);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid contactInfo JSON format' });
      }
    }

    const club = new ClubRecruitment({
      title,
      description,
      clubName,
      startDate,
      endDate,
      formUrl,
      image,
      contactInfo: parsedContactInfo,
      status: status || 'Open',
    });
    const savedClub = await club.save();
    res.status(201).json(savedClub);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a club recruitment (admin only)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Only admin can edit club recruitments.' });
  }
  const { title, description, clubName, startDate, endDate, formUrl, contactInfo, status } = req.body;
  if (!title || !description || !clubName || !startDate || !endDate || !formUrl || !status) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Validate date range
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return res.status(400).json({ message: 'Invalid date format.' });
  }
  if (start >= end) {
    return res.status(400).json({ message: 'Start date must be before end date.' });
  }

  // Validate formUrl
  try {
    new URL(formUrl);
  } catch (e) {
    return res.status(400).json({ message: 'Invalid form URL format.' });
  }

  try {
    const club = await ClubRecruitment.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club recruitment not found.' });

    if (req.file) {
      if (club.image && club.image.public_id) {
        try {
          await cloudinary.uploader.destroy(club.image.public_id);
        } catch (err) {
          console.error('Error deleting old club image:', err);
        }
      }
      
      try {
        const uploadPromise = new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'clubs' },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve({ public_id: result.public_id, url: result.secure_url });
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
        });
        
        club.image = await uploadPromise;
      } catch (error) {
        return res.status(500).json({ message: 'Cloudinary upload failed', error: error.message });
      }
    }

    let parsedContactInfo;
    if (contactInfo) {
      try {
        parsedContactInfo = JSON.parse(contactInfo);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid contactInfo JSON format' });
      }
    }

    club.title = title;
    club.description = description;
    club.clubName = clubName;
    club.startDate = startDate;
    club.endDate = endDate;
    club.formUrl = formUrl;
    club.contactInfo = parsedContactInfo;
    club.status = status;
    await club.save();
    res.json(club);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a club recruitment (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Only admin can delete club recruitments.' });
  }
  try {
    const club = await ClubRecruitment.findById(req.params.id);
    if (!club) return res.status(404).json({ message: 'Club recruitment not found.' });
    // Delete image from Cloudinary if exists
    if (club.image && club.image.public_id) {
      try {
        await cloudinary.uploader.destroy(club.image.public_id);
      } catch (err) {
        console.error('Error deleting club image:', err);
      }
    }
    await club.deleteOne();
    res.json({ message: 'Club recruitment deleted.' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router; 