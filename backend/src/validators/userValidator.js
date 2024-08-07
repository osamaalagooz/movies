const Joi = require('joi');

const userSchema = Joi.object({
    first_name: Joi.string().max(50).required(),
    last_name: Joi.string().max(50).required(),
    gender:Joi.string().max(50).required(),
    email: Joi.string().email().required(),
    birth_of_date: Joi.date().required(),
    password: Joi.string().min(5).required()
  });

const upddateUserSchema = Joi.object({
  first_name: Joi.string().max(50),
  last_name: Joi.string().max(50),
  email: Joi.string().email(),
 
});

module.exports = userSchema, upddateUserSchema