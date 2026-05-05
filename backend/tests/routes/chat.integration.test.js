const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Chat = require('../../models/Chat');

jest.mock('cloudinary', () => ({
  v2: {
    uploader: { upload_stream: jest.fn(), destroy: jest.fn() },
    config: jest.fn()
  }
}));

const chatRoutes = require('../../routes/chat');

describe('Chat integration routes', () => {
  let app;

  beforeAll(async () => {
    app = express();
    app.use(express.json());

    // Simple auth stub: attach a test user
        app.use((req, res, next) => {
          req.user = { _id: new mongoose.Types.ObjectId().toHexString(), name: 'Test User' };
      next();
    });

    app.use('/api/chat', chatRoutes);
  });

  beforeEach(async () => {
    await Chat.deleteMany({});
  });

  test('POST /api/chat/messages should create a chat message', async () => {
    const res = await request(app)
      .post('/api/chat/messages')
      .field('message', 'Hello from integration test')
      .expect(200);

    expect(res.body).toHaveProperty('message');
    const saved = await Chat.findOne({ message: 'Hello from integration test' }).lean();
    expect(saved).toBeTruthy();
    expect(saved.message).toBe('Hello from integration test');
    expect(saved.sender.toString()).toBe(reqOrUserId(res));
  });
});

// Helper to read assigned user id from response (best-effort)
function reqOrUserId(res) {
  // If controller returns sender id in response
  if (res.body && res.body.message && res.body.message.sender) return res.body.message.sender._id || res.body.message.sender;
  return null;
}
