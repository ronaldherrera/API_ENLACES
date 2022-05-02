//REQUERIMIENTOS
///conecta con el generador de errores
const { generateError } = require('../helpers');
///conectar con la base de datos
const { getConnection } = require('./db');
///conecta con el modulo de bcrypt
const bcrypt = require('bcrypt');

//FUNCION QUE DEVULVE LA INFORMACIÓN DE UN USUARIO POR SU EMAIL
const getUserByEmail = async (email) => {
  console.log(
    'entramos a la función que devuelve info del usuario por su email'
  );
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM users WHERE email = ?
      `,
      [email]
    );

    if (result.length === 0) {
      throw generateError('No hay ningun usuario con ese email', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//FUNCION QUE DEVULVE LA INFORMACIÓN DE UN USUARIO POR SU ID
const getUserById = async (id) => {
  console.log('entramos a la función que devuelve info del usuario por su ID');
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT id, email, created_at FROM users WHERE id=?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError('No hay ningun usuario con ese id', 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//FUNCION PARA CREAR USUARIO EN LA BASE DE DATOS Y DEVUELVE ID
const createUser = async (name, avatar = '', nick_name, email, password) => {
  console.log('entramos a la función que crea un usuario nuevo');
  let connection;
  try {
    connection = await getConnection();

    //comprueba que no existe otro usuario con ese email
    const [user_email] = await connection.query(
      `
        SELECT id FROM users WHERE email = ?
        `,
      [email]
    );
    ////si no devuelve error 409
    if (user_email.length > 0) {
      throw generateError(`Ya existe una cuenta con ${email}`, 409);
    }

    //comprueba que no existe otro usuario con ese nickname
    const [user_name] = await connection.query(
      `
      SELECT id FROM users WHERE nick_name = ?
       `,
      [nick_name]
    );
    ///si no devuelve error 409
    if (user_name.length > 0) {
      throw generateError(`Lo sentimos pero ${nick_name} ya esta en uso`, 409);
    }

    //encripta la password
    const passwordHash = await bcrypt.hash(password, 8);

    //si no detecta nombre en el registro pone el mismo el el nickname
    if (name.length <= 0) {
      name = `${nick_name}`;
    }

    //crea usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO users (name, avatar, nick_name, email, password) VALUES (?, ?, ?, ?, ?)
        `,
      [name, avatar, nick_name, email, passwordHash]
    );

    //devuelve ID
    return newUser.insertId;
  } finally {
    //se carga a la base de datos
    if (connection) connection.release();
  }
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
};
