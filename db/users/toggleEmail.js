const { getConnection } = require('../db');

const toggleEmail = async (email) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
    UPDATE users SET email=?`,
      [email]
    );
    return result.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

module.exports = { toggleEmail };
