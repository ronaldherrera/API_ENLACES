//REQUERIMIENTOS
///conecta con el modulo bcrypt
const bcrypt = require('bcrypt');
///conecta con el modulo jsonwebtoken
const jwt = require('jsonwebtoken');
///conecta con el generador de errores
const { generateError, createPathIfNotExists } = require('../helpers');
///conecta con las funciones del archivo "../db/users"
const { createUser, getUserById, getUserByEmail } = require('../db/users');
///conecta con el modulo path
const path = require('path');
///conecta con el modulo sharp
const sharp = require('sharp');
///conecta con el modulo nanoid
const { nanoid } = require('nanoid');
///conecta con el modulo joi
const joi = require('@hapi/joi');

//FUNCION PARA CONTROLAR  USUARIO NUEVO
const newUserController = async (req, res, next) => {
  console.log('pasamos por el controlador de usuarios nuevos');
  try {
    const { name, nick_name, email, password } = req.body;

    /////////////valida datos
    //requisitos para validar email
    const validationEmail = joi.string().email().required();
    let valideEmail = validationEmail.validate(email);
    if (valideEmail.error) {
      throw generateError(
        'Tiene que aportar una direcion de correo valida',
        400
      );
    }
    //requisitos para validar nick_name
    const validationNick = joi.string().min(5).max(10);
    let valideNick = validationNick.validate(nick_name);
    if (valideNick.error) {
      throw generateError(
        'Tiene aportar un nick name, con mininimo 5 y maximo 10 caracteres',
        400
      );
    }
    //requisitos para validar password
    const validationPassword = joi.string().min(5).max(10);
    let validePassword = validationPassword.validate(password);
    if (validePassword.error) {
      throw generateError(
        'Tiene aportar una contraseña, con mininimo 5 y maximo 10 caracteres',
        400
      );
    }

    /////////////gestiona el avatar
    let avatarFileName;
    //si el usuario agrega una avatar la guarda en el servidor
    if (req.files && req.files.avatar) {
      ///crea el path del directorio uploadsAvatar
      const uploadsAvatarDir = path.join(
        //__dirname,(lo comento or que me da error)
        './img/avatars/avatarsUpload'
      );

      ///crea el directorio si no existe
      await createPathIfNotExists(uploadsAvatarDir);

      ///procesa la imagen
      const avatar = sharp(req.files.avatar.data);
      avatar.resize(1000);

      //guarda la imagen con un nombre aleatorio en el directorio uploadsAvatar
      avatarFileName = `${nanoid(24)}.jpg`;

      await avatar.toFile(path.join(uploadsAvatarDir, avatarFileName));
    }

    //si el usuario no agrega una foto selecciona el avatar por defecto
    if (!req.files || !req.files.avatar) {
      avatarFileName = `default`;
    }

    const id = await createUser(
      name,
      avatarFileName,
      nick_name,
      email,
      password
    );

    res.send({
      status: 'ok',
      message: `Usuario creado con id: ${id}`,
    });
  } catch (error) {
    next(error);
  }
};

//FUNCION PARA CONTROLAR USUARIO
const getUserController = async (req, res, next) => {
  console.log('pasamos por el controlador para mostrar un usuario');
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
  console.log('pasamos por el controlador para el login');
  try {
    //console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      throw generateError('debes enviar un email y una contraseña', 400);
    }

    ///recojo los datos de la base de datosdel usuario con ese email
    const user = await getUserByEmail(email);

    ///compruebo que las contraseñas coinciden
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw generateError('La contraseña no coincide', 401);
    }
    ///creo el playload del token
    const payload = { id: user.id };

    ///firmo el token
    const token = jwt.sign(payload, process.env.secret, {
      expiresIn: '30d',
    });

    ///envio el token

    res.send({
      status: 'ok',
      data: token,
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
