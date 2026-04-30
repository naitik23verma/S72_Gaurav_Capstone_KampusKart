# Background Jobs and Scripts

## Cron jobs
### deleteItems (node-cron)
- Schedule: daily at 00:00
- Actions:
  - Soft delete resolved lost and found items older than 14 days
  - Soft delete resolved or closed complaints older than 14 days
  - Hard delete soft deleted records older than 7 days
  - Deletes associated Cloudinary images where appropriate

### keepAlive
- Runs when NODE_ENV is production and Render variables are set, or when ENABLE_KEEP_ALIVE=true
- Pings /api/health every 14 minutes to reduce cold starts
- Tracks success and failure metrics

## Scripts
- npm run seed: seeds dummy data into MongoDB
- npm run setup-uptime: prints external monitoring setup steps
- npm run test-keep-alive: tests /api/health and /api/server-status
