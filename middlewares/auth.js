const { generateError } = require("../helpers");
const jwt = require("jsonwebtoken");
const authUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      throw generateError("Falta la cabecera de autorización", 401);
    }
    //Comprobamos que el token sea correcto
    let token;
    try {
      token = jwt.verify(authorization, process.env.SECRET);
    } catch {
      throw generateError("Token incorrecto", 401);
    }

    //Metemos la info del token en la request para usarla en el controlador
    req.userId = token.id;
    //Saltamos al controlador
    next();
    console.log("Pasamos al controlador");
  } catch (error) {
    next(error);
  }
};

module.exports = { authUser };
