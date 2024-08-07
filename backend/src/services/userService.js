
const User = require('../models/userModel');
const CustomError = require('../errors/customeError');
const bcrypt = require('bcryptjs');

exports.updateProfile = async (user, userData) => {
    const updatedUser = await User.findByIdAndUpdate(user.id, userData, { new: true, runValidators: true });

    if (!updatedUser) {
        throw new CustomError('User not found', 404);
    }

    return updatedUser;
}


exports.changePassword = async (user, Data) => {

    const isMatch = await bcrypt.compare(Data.old_password, user.password);
    if (!isMatch) {
        throw new CustomError('Wronge old password !', 401);
    }
    user.password = Data.new_password
    await user.save();
    return "Password changed successfully"

}



