const Joi = require('@hapi/joi');
const fs = require('fs').promises;
const path = require('path');

/* const uploadDir = path.join(__dirname, 'uploads');
console.log(uploadDir); */
//Funcion de gestión de errores
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};
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

//Funciónd de validación de URL
const validateUrl = async (url) => {
  const schemaUrl = Joi.string().uri().required();

  const validate = schemaUrl.validate(url);
  if (validate.error) {
    throw generateError('La url debe empezar por https://');
  }
  console.log(validate);
  return validate;
};
//Funcion de creación de directorios
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

module.exports = {
  generateError,
  validateLogin,
  validateUrl,
  createPathIfNotExists,
};
