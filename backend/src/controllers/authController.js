const AuthService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    error.statusCode=400
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await AuthService.login(req.body);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};