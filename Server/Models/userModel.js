
const db = require('../config');

const createUserTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) PRIMARY KEY,
      password VARCHAR(255) NOT NULL,
      gender VARCHAR(6) NOT NULL
    )
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log('User table created or already exists');
  });
};

const createStateTable = () => {
  const query = `
     CREATE TABLE IF NOT EXISTS states (
       email varchar(255) NOT NULL,
       state varchar(14)
     )
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log('State table created or already exists');
  });
};

const createImageTable = () => {
  const query =  `
     CREATE TABLE IF NOT EXISTS images (
       img_id int primary key auto_increment,
       email varchar(255),
       image varchar(600),
       FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
     )
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log('Image table created or already exists');
  });
}

module.exports = { createUserTable,createStateTable,createImageTable };
