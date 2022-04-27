//REQUERIMIENTOS
///conecta con el generador de errores
const { generateError } = require('../helpers');
///conectar con la base de datos
const { getConnection } = require('./db');
///conecta con el modulo de bcrypt
const bcrypt = require('bcrypt');

//FUNCION QUE DEVULVE LA INFORMACIÓN DE UN USUARIO POR SU EMAIL
const getUserByEmail = async (email) => {
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
const createUser = async (email, password) => {
  let connection;
  try {
    connection = await getConnection();
    //comprueba que no existe otro usuario con ese email
    const [user] = await connection.query(
      `
        SELECT id FROM users WHERE email = ?
        `,
      [email]
    );
    //si no devuelve error 409
    if (user.length > 0) {
      throw generateError(
        'Ya existe un usuario en la base de datos con ese email',
        409
      );
    }
    //encrita la password
    const passwordHash = await bcrypt.hash(password, 8);

    //crea usuario
    const [newUser] = await connection.query(
      `
    INSERT INTO users (email, password) VALUES(?, ?)
        `,
      [email, passwordHash]
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
