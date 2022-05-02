const { getConnection } = require('../db');

const getAllPostWithVotes = async () => {
  let connection;
  try {
    //Añadir con número de likes
    connection = await getConnection();
    const [result] = await connection.query(
      `SELECT e.id, e.url, e.titulo, e.descripcion, COUNT(v.post_id) AS votes FROM enlaces e, votes v WHERE e.id=v.post_id GROUP BY e.id `
    );
    console.log(result);
    return result;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { getAllPostWithVotes };
