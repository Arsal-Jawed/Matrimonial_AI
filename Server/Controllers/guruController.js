const db = require('../config');

const getQuestions = (req,res) => {

    const {topic} = req.query;

    db.query("select question from loveguru where topic = ?",[topic],(err,result) => {
        if(err){res.status(500).send("failed to get questions");}
        else{
            res.status(200).json(result);
            console.log("Questions Fetched");
        }
    });
};

const giveAnswer  = (req,res) => {

    const {topic,question} = req.body;
    console.log("Answer API Called"+topic+question);

    db.query("select answer from loveguru where topic = ? AND question = ?",[topic,question],(err,result) => {
        if(err){res.status(500).send("Failed to Get Answer");}
        else{
            res.status(200).json(result);
            
        }
    });
}

const lowRate = (req, res) => {
    const { email, topic, question } = req.body;

    const getQidQuery = `
        SELECT Q_id FROM LoveGuru WHERE topic = ? AND question = ?
    `;

    db.query(getQidQuery, [topic, question], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length > 0) {
            const Q_id = result[0].Q_id;

            const checkFeedbackQuery = `
                SELECT * FROM feedback WHERE email = ? AND Q_id = ?
            `;

            db.query(checkFeedbackQuery, [email, Q_id], (err, feedbackResult) => {
                if (err) return res.status(500).json({ error: err.message });

                if (feedbackResult.length > 0) {
                    return res.status(200).json({ message: 'You have already rated this question' });
                }

                const insertFeedbackQuery = `
                    INSERT INTO feedback (email, Q_id, nature) VALUES (?, ?, -1)
                `;

                db.query(insertFeedbackQuery, [email, Q_id, 0], (err) => {
                    if (err) return res.status(500).json({ error: err.message });

                    const updateRatingQuery = `
                        UPDATE LoveGuru SET rating = rating - 1 WHERE Q_id = ?
                    `;

                    db.query(updateRatingQuery, [Q_id], (err) => {
                        if (err) return res.status(500).json({ error: err.message });

                        res.status(200).json({ message: 'Low rating recorded' });
                    });
                });
            });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    });
};

const highRate = (req, res) => {
    const { email, topic, question } = req.body;
    console.log("Milgaya: "+email+topic+question);

    const getQidQuery = `
        SELECT Q_id FROM LoveGuru WHERE topic = ? AND question = ?
    `;

    db.query(getQidQuery, [topic, question], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.length > 0) {
            const Q_id = result[0].Q_id;

            const checkFeedbackQuery = `
                SELECT * FROM feedback WHERE email = ? AND Q_id = ?
            `;

            db.query(checkFeedbackQuery, [email, Q_id, 1], (err, feedbackResult) => {
                if (err) return res.status(500).json({ error: err.message });

                if (feedbackResult.length > 0) {
                    return res.status(200).json({ message: 'You have already rated this question' });
                }

                const insertFeedbackQuery = `
                    INSERT INTO feedback (email, Q_id, nature) VALUES (?, ?, 1)
                `;

                db.query(insertFeedbackQuery, [email, Q_id], (err) => {
                    if (err) return res.status(200).json({ error: err.message });

                    const updateRatingQuery = `
                        UPDATE LoveGuru SET rating = rating + 1 WHERE Q_id = ?
                    `;

                    db.query(updateRatingQuery, [Q_id], (err) => {
                        if (err) return res.status(500).json({ error: err.message });

                        res.status(200).json({ message: 'High rating recorded' });
                    });
                });
            });
        } else {
            res.status(404).json({ message: 'Question not found' });
        }
    });
};

const customAnswer = (req,res) => {

    const {topic,question, answer} = req.body;
    console.log(topic+question+answer);
    
    db.query('insert into loveguru (topic,question,answer) values(?,?,?)',[topic,question,answer],(err,result) => {
        if(err){res.status(500).send("Failed to save Question");}
        else{
            res.status(200).json(result);
        }
    });
};

module.exports = {getQuestions,giveAnswer,lowRate,highRate,customAnswer};