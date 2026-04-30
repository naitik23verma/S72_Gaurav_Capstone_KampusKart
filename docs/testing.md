# Testing

## Backend
- Frameworks: Jest and Supertest
- Location: backend/tests
- Script: npm test (from backend)

Covered areas:
- Auth middleware and auth routes
- Validation middleware
- User and Complaint models
- Lost and Found routes
- Clubs and Events routes
- Email utilities

## Frontend
- Frameworks: Vitest and React Testing Library
- Location: frontend/src/tests
- Script: npm test (from frontend)
- Watch mode: npm run test:watch

Covered areas:
- Route smoke tests
- Utils and form validation
- Component level behavior tests

## CI
GitHub Actions runs both frontend and backend tests in CI on push and PR.
