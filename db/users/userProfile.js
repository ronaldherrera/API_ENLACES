const { getConnection } = require('../db');

const userProfile = async (
  userName,
  nombre,
  email,
  imagen,
  biografia,
  telefono,
  id
) => {
  let connection;
  try {
    connection = await getConnection();
    const [result] = await connection.query(
      `
    UPDATE users  SET userName=?,nombre = ?, email = ? ,imagen = ?, biografia = ?, telefono = ?
    WHERE id=?`,
      [userName, nombre, email, imagen, biografia, telefono, id]
    );
    return result.insertId;
  } finally {
    if (connection) {
      connection.release();
    }
  }
};
module.exports = { userProfile };
