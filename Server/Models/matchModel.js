const db = require('../config');

const createMatchTable = () => {

    const query = `
        CREATE TABLE IF NOT EXISTS matches(
        match_id INT AUTO_INCREMENT PRIMARY KEY,
        matcher varchar(220) NOT NULL,
        matched varchar(220) NOT NULL,
        suggestion varchar(1200) NOT NULL,
        review varchar(255) DEFAULT 'N'
        );
    `;

    db.query(query, (err,result) => {
        if(err) throw err;
        console.log("match table created or already exists");
    });
};

module.exports = { createMatchTable };