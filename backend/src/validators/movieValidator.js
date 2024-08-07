const Joi = require('joi');

const rateSchema = Joi.object({
    
    referance_id: Joi.number().required(),
    rating: Joi.number().min(0).max(10).required()
    
  });

module.exports = rateSchema