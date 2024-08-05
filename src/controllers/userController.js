const userService = require('../services/userService');

exports.updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await userService.updateProfile(req.user, req.body);
    res.status(201).json({ success: true, message:  "User updated successfully"});
  } catch (error) {
    error.statusCode=400
    next(error);
  }
};



exports.changePassword = async (req, res, next) => {
    try {
      const msg = await userService.changePassword(req.user, req.body);
      res.status(201).json({ success: true, message: msg });
    } catch (error) {
      error.statusCode=400
      next(error);
    }
  };