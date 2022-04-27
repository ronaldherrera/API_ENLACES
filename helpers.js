//MODULO PARA GENERA ERROR
const generateError = (message, status) => {
  const error = new Error(message);
  error.httpStatus = status;
  return error;
};

//EXPORTAR MODULOS
module.exports = {
  generateError,
};
