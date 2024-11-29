const db = require('../config');

const createProfileTable = () => {

    const query = `
       CREATE TABLE IF NOT EXISTS profiles (
       id INT AUTO_INCREMENT PRIMARY KEY,
       email VARCHAR(255),
       profile_image VARCHAR(600) NOT NULL,
       country VARCHAR(100) NOT NULL,
       city VARCHAR(100) NOT NULL,
       religion VARCHAR(100) NOT NULL,
       maritalStatus VARCHAR(50) NOT NULL,
       occupation VARCHAR(150) NOT NULL,
       education VARCHAR(150) NOT NULL,
       build VARCHAR(50) NOT NULL,
       children VARCHAR(5) NOT NULL,
       smoking VARCHAR(5) NOT NULL,
       drinking VARCHAR(5) NOT NULL,
       description VARCHAR(700) NOT NULL,
       FOREIGN KEY (email) REFERENCES users(email) ON DELETE CASCADE ON UPDATE CASCADE
       )
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log('Profile table created or already exists');
    });
};

module.exports = { createProfileTable };
