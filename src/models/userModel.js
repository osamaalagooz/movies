const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const movieSchema = new mongoose.Schema({
  referance_id: {
    type: Number
  },
  rating: {
    type: Number
  },
  is_rated: {
    type: Number
  }
})

const itemSchema = new mongoose.Schema({
  referance_id: {
    type: Number
  },
  movie: {
    type: mongoose.Schema.Types.Mixed,
  }
})

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: true,
  },
  birth_of_date: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  rated_movies: [movieSchema],
  wish_list: [itemSchema],
  favourite_list: [itemSchema]

});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

User = mongoose.model('User', userSchema);

module.exports = User