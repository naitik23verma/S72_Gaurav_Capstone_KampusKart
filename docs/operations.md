# Operations and Monitoring

## Health endpoints
- GET /api/health returns status, uptime, and environment
- GET /api/server-status reports readiness and uptime

## Keep alive strategy
- Internal keepAlive service pings /api/health every 14 minutes when enabled
- External monitoring is recommended for true 24x7 uptime
- GitHub Actions keep-alive workflow also pings the backend

## Logging
- Server logs errors in the global error handler
- KeepAlive tracks success and failure counts in memory

## Data cleanup
- deleteItems cron job runs daily to clean expired lost and found items and complaints
- Chat attachments can be cleaned by admin endpoint when messages are deleted
