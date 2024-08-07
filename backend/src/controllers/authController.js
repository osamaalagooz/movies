const AuthService = require('../services/authService');
const loginSchema = require('../validators/authValidator')
const userSchema = require('../validators/userValidator')
const CustomError = require('../errors/customeError');

exports.register = async (req, res, next) => {
  try {

    const { error } = userSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    const user = await AuthService.register(req.body);
    res.status(201).json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    const user = await AuthService.login(req.body);
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};