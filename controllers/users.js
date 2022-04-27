//REQUERIMIENTOS
///conecta con el generador de errores
const { generateError } = require('../helpers');
///conecta con la funcion "createUser" del archivo "../db/users"
const { createUser, getUserById /*getUserByEmail*/ } = require('../db/users');

//FUNCION PARA CONTROLAR  USUARIO NUEVO
const newUserController = async (req, res, next) => {
  try {
    //console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    //--sustituir por joi(poner requisitos para validar)
    if (!email || !password) {
      throw generateError('debes enviar un email y una password', 400);
    }
    //--sustituir por joi//

    const id = await createUser(email, password);

    res.send({
      status: 'ok',
      message: `User created whit id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR USUARIO
const getUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);

    res.send({
      status: 'ok',
      message: user,
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR LOGIN
const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('debes enviar un email y una contraseña', 400);
    }

    ///recojo los datos de la base de datosdel usuario con ese email
    //const user = await getUserByEmail(email);

    ///compruebo que las contraseñas coinciden

    ///creo el playload del token

    ///firmo el token

    ///envio el token

    res.send({
      status: 'error',
      message: 'Not implemented',
    });
  } catch (error) {
    next(error);
  }
};

//EXPORTAR FUNCIONES
module.exports = {
  newUserController,
  getUserController,
  loginController,
};
