const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Chat = require('../../models/Chat');

jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: (opts, cb) => {
        const { PassThrough } = require('stream');
        const stream = new PassThrough();
        // call callback after stream finishes
        stream.on('finish', () => cb(null, { secure_url: 'https://res.cloudinary.com/test/image.jpg', public_id: 'test-id' }));
        return stream;
      },
      destroy: jest.fn()
    },
    config: jest.fn()
  }
}));

// routes will be required after mocking auth middleware in beforeAll

describe('Chat integration routes', () => {
  let app;

  beforeAll(async () => {
    app = express();
    app.use(express.json());

    // Mock user lookup used by auth middleware. Return object with `.select()` to match Mongoose usage.
        const userId = new mongoose.Types.ObjectId();
        // Mock auth middleware before requiring routes (use static user to keep mock factory pure)
        jest.mock('../../middleware/auth', () => ({
          authMiddleware: (req, res, next) => { req.user = { _id: 'test-user', email: 'test@test' }; next(); },
          requireAdmin: () => (req, res, next) => next()
        }));

        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ userId: 'test-user' }, process.env.JWT_SECRET || 'test-secret-key');
        // attach token header via a small middleware to avoid altering route handlers
        app.use((req, res, next) => { req.headers.authorization = `Bearer ${token}`; next(); });

        // Mock the chat service to avoid exercising deep repository/media logic here
        jest.mock('../../services/chatService', () => ({
          sendMessage: jest.fn(async ({ userId, message }) => ({ _id: 'm1', message, sender: userId, timestamp: new Date() })),
          listMessages: jest.fn().mockResolvedValue({ messages: [], pagination: { total: 0, page: 1, pages: 0 } }),
          searchMessages: jest.fn().mockResolvedValue([]),
          editMessage: jest.fn(),
          deleteMessage: jest.fn(),
          addReaction: jest.fn(),
          markRead: jest.fn(),
          cleanupOrphanedAttachments: jest.fn()
        }));

        const chatRoutes = require('../../routes/chat');
        app.use('/api/chat', chatRoutes);
  });

  beforeEach(async () => {
    await Chat.deleteMany({});
  });

  test('POST /api/chat/messages should create a chat message', async () => {
    const res = await request(app)
      .post('/api/chat/messages')
      .set('Content-Type', 'application/json')
      .send({ message: 'Hello from integration test' });
    // debug output
    // eslint-disable-next-line no-console
    console.error('chat integration response status, headers:', res.status, res.headers);
    // eslint-disable-next-line no-console
    console.error('chat integration response body/text:', res.body, res.text);
    expect([200,201]).toContain(res.status);

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
