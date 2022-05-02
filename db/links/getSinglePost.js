const { getConnection } = require('../db');

const getSinglePost = async (id) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT enlaces.url, enlaces.titulo, enlaces.descripcion, COUNT(v.post_id) AS votes FROM enlaces, votes v WHERE enlaces.id=v.post_id AND enlaces.id=? GROUP BY enlaces.id`,
      [id]
    );
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getSinglePost };
//      `SELECT e.url, e.titulo, e.descripcion, COUNT(v.post_id) FROM enlaces e, votes v WHERE e.id=?`,
