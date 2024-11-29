const fs = require('fs');
const mysql = require('mysql');
const csv = require('csv-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'matrimonial',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

const csvFilePath = './Profiles2.csv';

fs.createReadStream(csvFilePath)
  .pipe(csv({ headers: ['email'] }))
  .on('data', (row) => {
    const query = `
      INSERT INTO states (email, state) 
      VALUES (?, ?)
    `;
    const values = [
      row.email?.trim() || 'default@example.com','offline'
    ];

    connection.query(query, values, (err) => {
      if (err) console.error('Insert Error:', err.message);
    });
  })
  .on('end', () => {
    console.log('Data imported successfully to profiles table!');
    connection.end();
  });
