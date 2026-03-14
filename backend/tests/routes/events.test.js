const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const Event = require('../../models/Event');
const authMiddleware = require('../../middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use('/api/events', require('../../routes/events'));

jest.mock('../../middleware/authMiddleware');
jest.mock('cloudinary');

describe('Events CRUD Operations', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Event.deleteMany({});
    jest.clearAllMocks();
  });

  describe('CREATE - POST /api/events', () => {
    test('should create a new event (admin)', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const eventData = {
        title: 'Tech Fest 2024',
        description: 'Annual tech festival',
        date: '2024-03-15',
        location: 'Main Auditorium'
      };

      const response = await request(app)
        .post('/api/events')
        .send(eventData)
        .expect(201);

      expect(response.body).toHaveProperty('_id');
      expect(response.body.title).toBe(eventData.title);
      expect(response.body.status).toBe('Upcoming');
    });

    test('should reject non-admin users', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'user123', isAdmin: false };
        next();
      });

      await request(app)
        .post('/api/events')
        .send({ title: 'Test' })
        .expect(403);
    });
  });

  describe('READ - GET /api/events', () => {
    test('should get all events sorted by date', async () => {
      await Event.create([
        {
          title: 'Event 1',
          description: 'Desc 1',
          date: '2024-01-01',
          location: 'Location 1'
        },
        {
          title: 'Event 2',
          description: 'Desc 2',
          date: '2024-02-01',
          location: 'Location 2'
        }
      ]);

      const response = await request(app)
        .get('/api/events')
        .expect(200);

      expect(response.body).toHaveLength(2);
      expect(response.body[0].title).toBe('Event 2');
    });
  });

  describe('UPDATE - PUT /api/events/:id', () => {
    test('should update event (admin)', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const event = await Event.create({
        title: 'Old Event',
        description: 'Old Desc',
        date: '2024-01-01',
        location: 'Old Location',
        status: 'Upcoming'
      });

      const response = await request(app)
        .put(`/api/events/${event._id}`)
        .send({
          title: 'Updated Event',
          description: 'Updated Desc',
          date: '2024-01-01',
          location: 'New Location',
          status: 'Completed'
        })
        .expect(200);

      expect(response.body.title).toBe('Updated Event');
      expect(response.body.status).toBe('Completed');
    });
  });

  describe('DELETE - DELETE /api/events/:id', () => {
    test('should delete event (admin)', async () => {
      authMiddleware.mockImplementation((req, res, next) => {
        req.user = { _id: 'admin123', isAdmin: true };
        next();
      });

      const event = await Event.create({
        title: 'Test Event',
        description: 'Test',
        date: '2024-01-01',
        location: 'Test Location'
      });

      await request(app)
        .delete(`/api/events/${event._id}`)
        .expect(200);

      const deletedEvent = await Event.findById(event._id);
      expect(deletedEvent).toBeNull();
    });
  });
});
