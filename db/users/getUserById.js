const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const getUserById = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(`SELECT * FROM users WHERE id=?`, [
      id,
    ]);
    if (result.length === 0) {
      throw generateError("'No existe ningun usuario con ese id ', 404");
    }
    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getUserById };
