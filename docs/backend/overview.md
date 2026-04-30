# Backend Overview

## Runtime and entry point
- Runtime: Node.js with Express 5
- Entry point: backend/server.js
- Auth: JWT with Passport for Google OAuth
- Storage: MongoDB via Mongoose

## Startup sequence
1. Validate required environment variables.
2. Configure security middleware (helmet, hpp, custom Mongo key sanitizer).
3. Configure CORS allow list from ALLOWED_ORIGINS plus localhost defaults.
4. Register JSON body parsing and Passport.
5. Mount route groups under /api.
6. Connect to MongoDB.
7. Start cron jobs (deleteItems and keepAlive).
8. Start HTTP server and attach Socket.IO.

## Middleware pipeline (high level)
- helmet with cross origin resource policy
- custom mongo sanitize that strips $ and . from body and params
- hpp to prevent parameter pollution
- cors with credentials support
- express.json body parser
- passport initialization

## Route groups
- /api/auth
- /api/user
- /api/profile
- /api/lostfound
- /api/complaints
- /api/news
- /api/events
- /api/facilities
- /api/clubs
- /api/chat
- /api/health
- /api/server-status

## Error handling
- Global error handler logs error details and returns safe messages in production.
- 404 handler returns JSON for unknown routes.

## Socket.IO
- Attached to the same HTTP server as Express.
- JWT authentication during the socket handshake.
- Global chat room and online user tracking.
