const Joi = require('@hapi/joi');
const { generateError } = require('../helpers');

//Funcion de validación de correo y contraseña
const validateLogin = async (email, password) => {
  const schemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(8).required(),
  });
  const validate = schemaLogin.validate({
    email: email,
    password: password,
  });
  if (validate.error) {
    if (validate.error.message.includes('password')) {
      throw generateError(
        'Es necesario introducir una contraseña de 3 a 8 caracteres',
        400
      );
    } else if (validate.error.message.includes('email')) {
      throw generateError('Es necesario introducir una email válido', 400);
    }
  }
  return validate;
};

module.exports = { validateLogin };
