require('dotenv').config();

//console.log(process.env);

const { getConnection } = require('./db');

async function main() {
  let connection;

  try {
    connection = await getConnection();

    console.log('borrando enlaces');
    await connection.query('DROP TABLE IF EXISTS likes');
    await connection.query('DROP TABLE IF EXISTS links');
    await connection.query('DROP TABLE IF EXISTS users');

    console.log('creando tablas');
    await connection.query(`
      CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        avatar VARCHAR(100),
        nick_name VARCHAR(100) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    await connection.query(`
      CREATE TABLE links (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        likes VARCHAR(30) NOT NULL,
        user_id INTEGER NOT NULL,
        titulo VARCHAR(30) NOT NULL,
        url VARCHAR(500) NOT NULL,
        description VARCHAR(280) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(user_id) REFERENCES users(id)
        );
    `);

    await connection.query(`
    CREATE TABLE likes (
        id INTEGER PRIMARY KEY AUTO_INCREMENT,
        likes VARCHAR(30) NOT NULL,
        links_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,  
        FOREIGN KEY(links_id) REFERENCES links(id)    
        );
  `);
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) connection.release();
    process.exit();
  }
}
main();
