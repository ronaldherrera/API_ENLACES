const { getConnection } = require('../db');

const createPost = async (userId, titulo, url, descripcion) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
      INSERT INTO enlaces (user_id, url, titulo, descripcion) VALUES (?,?,?,?)`,
      [userId, titulo, url, descripcion]
    );
    return result.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { createPost };
