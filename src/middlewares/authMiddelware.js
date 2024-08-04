const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
  console.log(req.path)
  const excludedRoutes = ['/api/auth/login', '/api/auth/register'];
  if (excludedRoutes.includes(req.path)) {
    console.log(req.path)
    return next(); // Skip the middleware for excluded routes
  }
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token verification failed' });
  }
};
