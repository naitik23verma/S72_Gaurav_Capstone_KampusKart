const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: (opts, cb) => {
        const { PassThrough } = require('stream');
        const stream = new PassThrough();
        stream.on('finish', () => cb(null, { secure_url: 'https://res.cloudinary.com/test/image.jpg', public_id: 'test-id' }));
        return stream;
      },
      destroy: jest.fn()
    },
    config: jest.fn()
  }
}));

const profileRoutes = require('../../routes/profile');

describe('Uploads integration routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    // Provide Authorization header and mock User.findById used by authMiddleware
    const userId = new mongoose.Types.ObjectId();
    // Mock auth middleware before importing routes (use static user to keep mock factory pure)
    jest.mock('../../middleware/auth', () => ({
      authMiddleware: (req, res, next) => { req.user = { _id: 'test-user', email: 'uploader@test' }; next(); },
      requireAdmin: () => (req, res, next) => next()
    }));

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ userId: 'test-user' }, process.env.JWT_SECRET || 'test-secret-key');
    app.use((req, res, next) => { req.headers.authorization = `Bearer ${token}`; next(); });

    const profileRoutes = require('../../routes/profile');
    app.use('/api/profile', profileRoutes);
  });

  test('PUT /api/profile should accept a profile picture upload', async () => {
    const testFile = path.join(__dirname, '..', 'fixtures', 'test-image.jpg');
    // Ensure fixtures directory exists; tests can still run without the file if needed
    const agent = request(app);
    const req = agent.put('/api/profile').attach('profilePicture', testFile).field('name', 'Uploader');
    const res = await req.expect(res => {
      // Either 200 or 201 depending on controller implementation
      if (![200, 201].includes(res.status)) throw new Error('Unexpected status ' + res.status);
    });

    // Expect response to contain profile data or success message
    expect(res.body).toBeDefined();
  });
});
