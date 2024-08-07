const Joi = require('joi');

const loginSchema = Joi.object({
    
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
    
  });

const changePasswordSchema = Joi.object({
    
    old_password: Joi.string().min(5).required(),
    new_password: Joi.string().min(5).required()
    
  });

module.exports = loginSchema, changePasswordSchema