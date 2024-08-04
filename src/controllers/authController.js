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
    const {token, user} = await AuthService.login(req.body);
    response = {
      first_name: user.first_name,
      last_name : user.last_name,
      gender : user.gender,
      email: user.email,
      token: token
    }
    res.status(200).json({ success: true, response });
  } catch (error) {
    next(error);
  }
};