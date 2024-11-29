const db = require('../config');

const createProposalTable = () =>{

    const query = `
      CREATE TABLE IF NOT EXISTS proposals(
      id INT PRIMARY KEY AUTO_INCREMENT,
      proposal VARCHAR(255) NOT NULL,
      proposed VARCHAR(255) NOT NULL,
      state CHAR NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log('Proposal table created or already exists');
      });
};

const createBlockTable = () => {

  const query = `
     CREATE TABLE IF NOT EXISTS blocks(
     id INT PRIMARY KEY AUTO_INCREMENT,
     blocker varchar(220),
     blocked varchar(220),
     date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     )
  `;

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log('Blocks table created or already exists');
  });
}
    
module.exports = {createProposalTable,createBlockTable};