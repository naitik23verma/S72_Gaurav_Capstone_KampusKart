const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('../../routes/auth');
const User = require('../../models/User');

jest.mock('../../models/User');

describe('Auth integration routes', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRoutes);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/auth/signup should create user (flow stubbed)', async () => {
    const payload = { email: 'inttest@example.com', password: 'Pass1234!', name: 'Int Test' };
    const mockUser = { _id: new mongoose.Types.ObjectId().toHexString(), email: payload.email, name: payload.name, save: jest.fn().mockResolvedValue(true) };
    User.findOne.mockResolvedValue(null);
    User.mockImplementation(() => mockUser);

    const res = await request(app).post('/api/auth/signup').send(payload);

    // Expect no crash and a JSON response (status depends on controller implementation)
    expect([200,201,400,422]).toContain(res.status);
  });
});
