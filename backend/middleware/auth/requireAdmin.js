const requireAdmin = (message) => (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ message: message || 'Admin access required' });
  }
  return next();
};

module.exports = { requireAdmin };
