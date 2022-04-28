//REQUERIMIENTOS
///conecta con el modulo jsonwebtoken
const jwt = require('jsonwebtoken');
///conecta con el generador de errores
const { generateError } = require('../helpers');

//FUNCION PARA COMPROBAR AUTORIZACION DEL USUARIO
const authUser = (req, res, next) => {
  try {
    console.log(req.headers);
    console.log('entramos al controlador para verificar token');
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Falta la cabecera de Authorization', 401);
    }

    //verifica token
    let token;

    try {
      token = jwt.verify(authorization, process.env.secret);
    } catch {
      throw generateError('Token incorrecto', 401);
    }
    //console.log(token);

    //metemos la información del token en la request para usarla en el controlador
    req.userId = token.id;

    //saltamos al controlador siguiente
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
