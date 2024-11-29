
const db = require('../config');

const createLikedTable = () => {
  const query = `
    CREATE TABLE IF NOT EXISTS liked (
      id INT PRIMARY KEY AUTO_INCREMENT,
      saver VARCHAR(255) NOT NULL,
      saved VARCHAR(255) NOT NULL,
      FOREIGN KEY (saved) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
    )
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log('Liked table created or already exists');
  });
};

module.exports = { createLikedTable };
