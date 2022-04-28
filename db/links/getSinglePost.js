const { getConnection } = require('../db');

const getSinglePost = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT * FROM enlaces WHERE id=?`,
      [id]
    );
    return result[0];
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getSinglePost };
