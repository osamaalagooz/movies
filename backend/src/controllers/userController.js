const userService = require('../services/userService');
const upddateUserSchema = require('../validators/userValidator')
const changePasswordSchema = require("../validators/authValidator")
const CustomError = require('../errors/customeError');


exports.updateProfile = async (req, res, next) => {
  try {
    const { error } = upddateUserSchema.validate(req.body);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }
    const updatedUser = await userService.updateProfile(req.user, req.body);
    res.status(201).json({ success: true, user:  req.body});
  } catch (error) {
    error.statusCode=400
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
    try {
      const { error } = changePasswordSchema.validate(req.body);
      if (error) {
        throw new CustomError(error.details[0].message, 400);
      }
      const msg = await userService.changePassword(req.user, req.body);
      res.status(201).json({ success: true, message: msg });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };