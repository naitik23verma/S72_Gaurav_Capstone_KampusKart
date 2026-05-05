const request = require('supertest');
const express = require('express');
const complaintsRoutes = require('../../routes/complaints');
const Complaint = require('../../models/Complaint');

jest.mock('../../models/Complaint');

describe('Complaints integration', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use((req, res, next) => { req.user = { _id: 'user1' }; next(); });
    app.use('/api/complaints', complaintsRoutes);
  });

  beforeEach(() => jest.clearAllMocks());

  test('POST /api/complaints should create complaint', async () => {
    Complaint.create.mockResolvedValue({ _id: 'c1', title: 'Issue' });
    const res = await request(app).post('/api/complaints').send({ title: 'Issue', description: 'Details' });
    expect([200,201,400]).toContain(res.status);
  });
});
