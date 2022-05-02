const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

//Funciónd de validación de URL
const validateUrl = async (url) => {
  const schemaUrl = Joi.string().uri().required();

  const validate = schemaUrl.validate(url);
  if (validate.error) {
    throw generateError('La url debe empezar por https://');
  }

  return validate;
};
module.exports = { validateUrl };
