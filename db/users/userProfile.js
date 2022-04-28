const { getConnection } = require('../db');

const userProfile = async (
  nombre,
  imagen,
  biografia,
  telefono,
  direccion,
  id
) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
    UPDATE users  SET nombre = ?, imagen = ?, biografia = ?, telefono = ?, direccion = ?
    WHERE id=?`,
      [nombre, imagen, biografia, telefono, direccion, id]
    );
    return result.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { userProfile };
