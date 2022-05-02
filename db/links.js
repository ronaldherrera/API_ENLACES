//REQUERIMIENTOS
///conecta con el generador de errores
const { generateError } = require('../helpers');
///conectar con la base de datos
const { getConnection } = require('./db');

//FUNCIÓN PARA CREAR UN LINK NUEVO
const createlink = async (userId, likes, titulo, url, description) => {
  console.log('entramos a la función para crear un link nuevo');
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO links (user_id, likes, titulo, url, description)
        VALUES(?,?,?,?,?)
      `,
      [userId, likes, titulo, url, description]
    );

    return result.insertId;
  } finally {
    if (connection) connection.release();
  }
};

//FUNCIÓN PARA MOSTRAR UN LINK
const getLinkById = async (id) => {
  console.log('entramos a la función para mostrar un link');
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
      SELECT * FROM links WHERE id=?
      `,
      [id]
    );

    if (result.length === 0) {
      throw generateError(`No hay ningun link con el id: ${id}`, 404);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};

//FUNCIÓN PARA VOTAR UN LINK
const createLike = async (likes, links_id, user_id) => {
  console.log('entramos a la función para VOTAR un link');
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
        INSERT INTO likes (likes, links_id, user_id)
        VALUES(likes, links_id, user_id)
      `,
      [likes, links_id, user_id]
    );

    if (result.length === 0) {
      throw generateError(`No hay voto`);
    }

    return result[0];
  } finally {
    if (connection) connection.release();
  }
};
//FUNCIÓN PARA MOSTRAr TODOS LOS LINKS
const getAllLinks = async () => {
  console.log('entramos a la función para mostrar todos los links');
  let connection;

  try {
    connection = await getConnection();

    const [result] = await connection.query(`
        SELECT * FROM links ORDER BY created_at DESC
      `);

    return result;
  } finally {
    if (connection) connection.release();
  }
};

//FUNCIÓN PARA BORRAR UN LINK
const deleteLinkById = async (id) => {
  console.log('entramos a la función para borrar un link');
  let connection;

  try {
    connection = await getConnection();

    await connection.query(
      `
        DELETE FROM links WHERE id = ?
      `,
      [id]
    );

    return;
  } finally {
    if (connection) connection.release();
  }
};

//EXPORTAR FUNCIONES
module.exports = {
  createlink,
  getAllLinks,
  getLinkById,
  createLike,
  deleteLinkById,
};
