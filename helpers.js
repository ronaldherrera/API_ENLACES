const fs = require('fs').promises;

//Funcion de gestión de errores
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
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

  createPathIfNotExists,
};
