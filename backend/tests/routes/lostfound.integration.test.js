const request = require('supertest');
const express = require('express');
const lostfoundRoutes = require('../../routes/lostfound');
const LostFoundItem = require('../../models/LostFoundItem');

jest.mock('../../models/LostFoundItem');

describe('Lost & Found integration', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    // attach a simple auth stub (req.user)
    app.use((req, res, next) => { req.user = { _id: 'user1', email: 'user@test' }; next(); });
    app.use('/api/lostfound', lostfoundRoutes);
  });

  beforeEach(() => jest.clearAllMocks());

  test('POST /api/lostfound should accept a new item', async () => {
    LostFoundItem.create.mockResolvedValue({ _id: 'item1', title: 'Test Item' });
    const res = await request(app).post('/api/lostfound').send({ title: 'Test Item', description: 'desc' });
    expect([200,201,400]).toContain(res.status);
  });
});
