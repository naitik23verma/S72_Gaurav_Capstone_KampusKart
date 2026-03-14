const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const ClubRecruitment = require('../../models/ClubRecruitment');
const authMiddleware = require('../../middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api/clubs', require('../../routes/clubs'));

// Mock auth middleware
jest.mock('../../middleware/authMiddleware');
jest.mock('cloudinary');

describe('Clubs CRUD Operations', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await ClubRecruitment.deleteMany({});
    jest.clearAllMocks();
  });

  describe('CREATE - POST /api/clubs', () => {
    test('should create a new club recruitment (admin)', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const clubData = {
        title: 'Drama Club Recruitment 2024',
        description: 'Join our drama club',
        clubName: 'Drama Club',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        formUrl: 'https://forms.google.com/test'
      };

      const response = await request(app)
        .post('/api/clubs')
        .send(clubData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(clubData.title);
      expect(response.body.status).toBe('Open');
    });

    test('should reject non-admin users', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'user123', isAdmin: false };
        next();
      });

      const response = await request(app)
        .post('/api/clubs')
        .send({ title: 'Test' })
        .expect(403);

      expect(response.body.message).toContain('Not authorized');
    });

    test('should validate required fields', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const response = await request(app)
        .post('/api/clubs')
        .send({ title: 'Test' })
        .expect(400);

      expect(response.body.message).toContain('required');
    });
  });

  describe('READ - GET /api/clubs', () => {
    test('should get all clubs', async () => {
      await ClubRecruitment.create([
        {
          title: 'Club 1',
          description: 'Desc 1',
          clubName: 'Club1',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          formUrl: 'https://test.com'
        },
        {
          title: 'Club 2',
          description: 'Desc 2',
          clubName: 'Club2',
          startDate: '2024-02-01',
          endDate: '2024-02-28',
          formUrl: 'https://test.com'
        }
      ]);

      const response = await request(app)
        .get('/api/clubs')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Club 2'); // Sorted by startDate desc
    });
  });

  describe('UPDATE - PUT /api/clubs/:id', () => {
    test('should update club (admin)', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const club = await ClubRecruitment.create({
        title: 'Old Title',
        description: 'Old Desc',
        clubName: 'Club',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        formUrl: 'https://test.com',
        status: 'Open'
      });

      const response = await request(app)
        .put(`/api/clubs/${club._id}`)
        .send({
          title: 'New Title',
          description: 'New Desc',
          clubName: 'Club',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          formUrl: 'https://test.com',
          status: 'Closed'
        })
        .expect(200);

      expect(response.body.title).toBe('New Title');
      expect(response.body.status).toBe('Closed');
    });

    test('should return 404 for non-existent club', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const fakeId = new mongoose.Types.ObjectId();
      await request(app)
        .put(`/api/clubs/${fakeId}`)
        .send({
          title: 'Test',
          description: 'Test',
          clubName: 'Test',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          formUrl: 'https://test.com',
          status: 'Open'
        })
        .expect(404);
    });
  });

  describe('DELETE - DELETE /api/clubs/:id', () => {
    test('should delete club (admin)', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const club = await ClubRecruitment.create({
        title: 'Test Club',
        description: 'Test',
        clubName: 'Club',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        formUrl: 'https://test.com'
      });

      await request(app)
        .delete(`/api/clubs/${club._id}`)
        .expect(200);

      const deletedClub = await ClubRecruitment.findById(club._id);
      expect(deletedClub).toBeNull();
    });

    test('should reject non-admin deletion', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'user123', isAdmin: false };
        next();
      });

      const club = await ClubRecruitment.create({
        title: 'Test Club',
        description: 'Test',
        clubName: 'Club',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        formUrl: 'https://test.com'
      });

      await request(app)
        .delete(`/api/clubs/${club._id}`)
        .expect(403);
    });
  });
});
