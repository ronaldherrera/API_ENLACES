const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const getUserByEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();

    const [result] = await connection.query(
      `
    SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (result.length === 0) {
      throw generateError('No existe ningun usuario con ese email ', 404);
    }
    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getUserByEmail };
