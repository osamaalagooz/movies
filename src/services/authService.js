const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/customeError');


exports.register = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user;
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new CustomError("Invalid credentials", 401);
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
  response = {
    first_name: user.first_name,
    last_name : user.last_name,
    gender : user.gender,
    email: user.email,
    token: token
  }
  return response
};
