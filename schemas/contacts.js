const Joi = require('joi');

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string()
    .pattern(/^[0-9\s+()-]+$/)
    .required(),
});

module.exports = {
  addSchema,
};
