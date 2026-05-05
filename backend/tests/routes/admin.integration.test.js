const request = require('supertest');
const express = require('express');
const requireAdmin = require('../../middleware/auth').requireAdmin;

describe('Admin authorization', () => {
  let app;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    // A protected admin route for testing
    app.get('/admin-only', (req, res, next) => { req.user = { email: 'user@test' }; next(); }, requireAdmin('Admins only'), (req, res) => res.json({ ok: true }));
  });

  test('should reject non-admin', async () => {
    const res = await request(app).get('/admin-only');
    expect(res.status).toBe(403);
  });
});
