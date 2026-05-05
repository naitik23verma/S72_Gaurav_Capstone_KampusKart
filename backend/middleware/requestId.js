const { randomUUID } = require('crypto');

function requestIdMiddleware(req, res, next) {
  // Prefer incoming id header if provided (from proxy/load balancer)
  const incoming = req.get('X-Request-Id') || req.get('x-request-id');
  const id = incoming || randomUUID();
  req.requestId = id;
  // Expose request id to downstream services and clients
  req.headers['x-request-id'] = id;
  res.setHeader('X-Request-Id', id);
  next();
}

module.exports = requestIdMiddleware;
