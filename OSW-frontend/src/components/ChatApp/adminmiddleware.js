module.exports = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin) {
    return next(); // Allow admin to access the route
  } else {
    res.status(403).json({ message: 'Access denied. You are not an admin.' });
  }
};
