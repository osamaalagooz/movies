const AuthService = require('../services/authService');

exports.register = async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const token = await AuthService.login(req.body);
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};