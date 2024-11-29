const db = require('../config');

const createLoveGuruTable = () => {

    const query = `
       CREATE TABLE IF NOT EXISTS LoveGuru(
         Q_id INT PRIMARY KEY AUTO_INCREMENT,
         topic varchar(120),
         question varchar(400),
         answer varchar(1200),
         rating int default 10
       )
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log('LoveGuru table created or already exists');
      });
};

const createFeedbackTable = () => {

  const query =   `
     CREATE TABLE IF NOT EXISTS feedback(
       f_id INT PRIMARY KEY AUTO_INCREMENT,
       email varchar(220),
       Q_id INT,
       nature INT
     )
  `;

  db.query(query, (err,result) => {
    if(err) throw err;
    console.log('LoveGuru Feedback table created or alreaddy exists');
  });
};

const createLocationGuruTable = () => {

  const query = `
     CREATE TABLE IF NOT EXISTS location_suggestions(
       s_id INT PRIMARY KEY AUTO_INCREMENT,
       email1 varchar(220),
       email2 varchar(220),
       suggestion varchar(1000)
     )
  `;

  db.query(query, (err,result) => {
    if(err) throw err;
    console.log('Location Suggestion table created or alreaddy exists');
  });
}

module.exports = {createLoveGuruTable,createFeedbackTable,createLocationGuruTable};