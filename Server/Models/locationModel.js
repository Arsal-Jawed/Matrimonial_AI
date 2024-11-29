const { error } = require('console');
const db = require('../config');

const createLocationTable = () => {

    const query = `
        CREATE TABLE IF NOT EXISTS locations(
          location_id INT AUTO_INCREMENT PRIMARY KEY,
          title varchar(260) NOT NULL,
          provider varchar(260) DEFAULT 'admin7554@gmail.com',
          location_image varchar(600) NOT NULL,
          city varchar(100) NOT NULL,
          address varchar(1000) NOT NULL
        )
    `;

    db.query(query, (err,result) => {

        if(err) throw error;
        console.log("Location table created or already exists");
    })
};

module.exports = {createLocationTable};