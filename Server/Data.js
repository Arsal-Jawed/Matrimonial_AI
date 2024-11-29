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

const csvFilePath = './Data2.csv';

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const query = `INSERT INTO loveguru (topic, question, answer) VALUES (?, ?, ?)`;
    const values = [row.topic, row.question, row.Output];

    connection.query(query, values, (err) => {
      if (err) throw err;
    });
  })
  .on('end', () => {
    console.log('Data imported successfully!');
    connection.end();
  });
