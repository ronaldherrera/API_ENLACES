const mysql = require('mysql2/promise');

const { mysql_host, mysql_user, mysql_password, mysql_database } = process.env;

let pool;
//MODULO PARA HACER POOL AL SERVIDOR
const getConnection = async () => {
  if (!pool) {
    pool = mysql.createPool({
      connectionLimit: 10,
      host: mysql_host,
      user: mysql_user,
      password: mysql_password,
      database: mysql_database,
      timezone: 'Z',
    });
  }

  return await pool.getConnection();
};

//EXPORTAR MODULOS
module.exports = {
  getConnection,
};
