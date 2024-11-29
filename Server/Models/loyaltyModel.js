const db = require('../config');

const createLoyaltyTable = () => {

    const createLoyaltyTableQuery = `
        CREATE TABLE IF NOT EXISTS loyalty (
            check_id INT PRIMARY KEY AUTO_INCREMENT,
            person VARCHAR(220),
            verifier VARCHAR(220),
            interest INT,
            chats INT,
            proposals INT,
            matches INT,
            nsfws INT,
            likes INT,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(createLoyaltyTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Loyalty table created or already exists');
    });

    const createLoyaltyLogTableQuery = `
        CREATE TABLE IF NOT EXISTS loyalty_log (
            log_id INT PRIMARY KEY AUTO_INCREMENT,
            person VARCHAR(220),
            verifier VARCHAR(220),
            previous_interactions INT,
            new_interactions INT,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    db.query(createLoyaltyLogTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Loyalty Log table created or already exists');
    });

    const createTriggerQuery = `
         CREATE TRIGGER loyalty_after_insert
        AFTER INSERT ON loyalty
        FOR EACH ROW
        BEGIN
            DECLARE previous_interactions INT;

            SELECT 
                COALESCE(SUM(matches + likes + proposals + chats + nsfws), 0)
            INTO previous_interactions
            FROM loyalty
            WHERE person = NEW.person AND verifier = NEW.verifier;

            SET @new_interactions = NEW.matches + NEW.likes + NEW.proposals + NEW.chats + NEW.nsfws;

            INSERT INTO loyalty_log (person, verifier, previous_interactions, new_interactions, date)
            VALUES (NEW.person, NEW.verifier, previous_interactions, @new_interactions, NOW());
        END
    `;

    db.query(createTriggerQuery, (err, result) => {
        if (err) {
            if (err.code === 'ER_TRG_ALREADY_EXISTS') {
                console.log('Trigger already exists');
            } else {
                throw err;
            }
        } else {
            console.log('Trigger created or already exists');
        }
    });
};

module.exports = { createLoyaltyTable };
