const db = require('../config');

const createRoomTable = () => {

    const query = `
    CREATE TABLE IF NOT EXISTS rooms (
       id INT PRIMARY KEY AUTO_INCREMENT,
       email1 VARCHAR(255) NOT NULL,
       email2 VARCHAR(255) NOT NULL,
       room INT NOT NULL
    )
    `;

db.query(query, (err, result) => {
    if (err) throw err;
    console.log('Rooms table created or already exists');
  });
};

module.exports = { createRoomTable };