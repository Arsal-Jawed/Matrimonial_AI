const db = require('../config');

const createOrGetRoom = async (req, res) => {
    const Room_No = (Math.floor(Math.random() * 900) + 100).toString();
    const { mail1, mail2 } = req.body;

    db.query('SELECT * FROM rooms WHERE (email1 = ? AND email2 = ?) OR (email1 = ? AND email2 = ?)', [mail1, mail2, mail2, mail1], (err, result) => {
        if (err) {
            res.status(500).send('Internal server error');
        } else {
            if (result.length > 0) {
                res.status(200).json(result[0].room);
            } else {
                db.query('INSERT INTO rooms (email1, email2, room) VALUES (?, ?, ?)', [mail1, mail2, Room_No], (err) => {
                    if (err) {
                        res.status(500).send('Internal server error');
                    } else {
                        res.status(200).json(Room_No);
                    }
                });
            }
        }
    });
};

const saveChatHistory = (req,res) => {

    const {chat1,chat2} = req.body;

    db.query('INSERT INTO chatHistory(chat1,chat2) VALUES(?,?)',[chat1,chat2],(err,result) => {

        if(err){
            res.status(402).send("Failed to save Chat History");
        }else{
            res.status(200).json(result);
        }
    });
};

const getChatHisstory = (req,res) => {
    
    const {email} = req.query;

    db.query('SELECT ch.*,u.username as username FROM chatHistory ch join users u on ch.chat2=u.email WHERE ch.chat1 = ?',[email],(err,result) => {
        if(err){
            res.status(402).send("Failed to get Chat History");
        }else{
            res.status(200).json(result);
        }
    });
};

const saveRequest = (req,res) => {

    const {chat1,chat2} = req.body;

    db.query('INSERT INTO chatRequest(chat1,chat2,state) VALUES(?,?,?)',[chat1,chat2,'P'],(err,result) => {

        if(err){
            res.status(402).send("Failed to save Chat Request");
        }else{
            res.status(200).json(result);
        }
    });
};

const deleteRequest = (req,res) => {
    
    const {chat1,chat2} = req.body;
    console.log(chat1+chat2);

    db.query('DELETE FROM chatRequest WHERE chat1 = ? AND chat2 = ?',[chat1,chat2],(err,result) => {

        if(err){
            res.status(402).send("Failed to save Delete Request");
        }else{
            res.status(200).json(result);
        }
    });
};

const getRequest = (req,res) => {

    const {matched} = req.query;

    db.query('SELECT cr.*, u.username as username FROM chatRequest cr join users u on cr.chat1 = u.email WHERE cr.chat2 = ?',[matched],(err,result) => {
        if(err){throw err}else{

            res.status(200).json(result);
        }
    });
};

const giveWarning = (req,res) => {

    const {email} = req.body;
    const query = `INSERT INTO NSFW (email, Warnings) VALUES (?, 1) ON DUPLICATE KEY UPDATE Warnings = Warnings + 1`;
    db.query(query, [email], (err, result) => {
        if (err) {
            console.error('Error updating warnings:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(200).json({ message: 'Warning count updated successfully' });
    });
}

module.exports = { createOrGetRoom,saveChatHistory,saveRequest,deleteRequest,getRequest,getChatHisstory,giveWarning };
