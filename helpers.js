const fs = require('fs/promises');

//MODULO PARA GENERA ERROR
const generateError = (message, status) => {
  console.log('generamos un error');
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//FUNCION PARA CREAR DIRECTORIO SI NO EXITE
const createPathIfNotExists = async (path) => {
  try {
    await fs.access(path);
  } catch {
    await fs.mkdir(path);
  }
};

//EXPORTAR MODULOS
module.exports = {
  generateError,
  createPathIfNotExists,
};
