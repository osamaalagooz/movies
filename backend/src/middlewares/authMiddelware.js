const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

exports.protect = async (req, res, next) => {
  const excludedRoutes = ['/api/auth/login', '/api/auth/register']; // does not need to be authanticated
  if (excludedRoutes.includes(req.path)) {
    console.log(req.path)
    return next(); // Skip the middleware for excluded routes
  }
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token)
  if (!token) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); 
    if (!user) {
      throw new Error
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token verification failed' });
  }
};
