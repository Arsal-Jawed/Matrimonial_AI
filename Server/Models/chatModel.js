const db = require('../config');

const createChatHistoryTable = () => {

    const query = `
       CREATE TABLE IF NOT EXISTS chatHistory(
         chat_id INT PRIMARY KEY AUTO_INCREMENT,
         chat1 varchar(220) NOT NULL,
         chat2 varchar(220) NOT NULL,
         date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
       )
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log('chat_history table created or already exists');
      });
};

const createChatRequestTable = () => {

    const query = `
       CREATE TABLE IF NOT EXISTS chatRequest(
         chatRequest_id INT PRIMARY KEY AUTO_INCREMENT,
         chat1 varchar(220) NOT NULL,
         chat2 varchar(220) NOT NULL,
         state CHAR NOT NULL
       )
    `;

    db.query(query, (err, result) => {
        if (err) throw err;
        console.log('chat_request table created or already exists');
      });
};

module.exports = {createChatHistoryTable,createChatRequestTable};