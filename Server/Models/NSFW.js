const db = require('../config');

const createNSFWTable = () => {

    const query = `
       CREATE TABLE IF NOT EXISTS NSFW(
         email varchar(220) NOT NULL,
         Warnings int
       )
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log('NSFW table created or already exists');
      });
};

module.exports = {createNSFWTable};