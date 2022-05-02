const { generateError } = require('../../helpers');
const { getConnection } = require('../db');

const votePost = async (id, idUser) => {
  let connection;
  try {
    connection = await getConnection();

    //Comprobamos que existe el post
    const [post] = await connection.query(
      `
    SELECT id, url, user_id FROM enlaces WHERE id = ?
      `,
      [id]
    );
    const idPost = post.map((e) => e.id);
    //Comprobar que no existe un voto anterior del usuario

    const [existingVote] = await connection.query(
      `SELECT id FROM votes WHERE post_id=? AND post_user_id = ?`,
      [id, idUser]
    );
    if (existingVote.length > 0) {
      throw generateError(`Ya votaste el post ${idPost} con tu usuario`);
    }
    //Guardamos voto en la base de datos
    await connection.query(
      `
      INSERT INTO votes (post_id, post_user_id)
      VALUES(?,?)`,
      [id, idUser]
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { votePost };
