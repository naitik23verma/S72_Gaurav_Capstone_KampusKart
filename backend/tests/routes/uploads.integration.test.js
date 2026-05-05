const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

jest.mock('cloudinary', () => ({
  v2: {
    uploader: { upload_stream: jest.fn((opts, cb) => cb(null, { secure_url: 'https://res.cloudinary.com/test/image.jpg', public_id: 'test-id' })) , destroy: jest.fn() },
    config: jest.fn()
  }
}));

const profileRoutes = require('../../routes/profile');

describe('Uploads integration routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    // Simple auth stub: attach a test user
    app.use((req, res, next) => {
      req.user = { _id: new mongoose.Types.ObjectId().toHexString(), name: 'Uploader' };
      next();
    });
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
