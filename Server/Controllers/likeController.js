const db = require('../config');

const saveLiked = (req, res) => {
    const { saver, saved } = req.body;
    console.log(saver + "\n" + saved);

    db.query(`SELECT * FROM liked WHERE saver = ? AND saved = ?`, [saver, saved], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }
        if (result.length > 0) {
            return res.status(200).json({ message: "Profile already liked" });
        } else {
            db.query(`INSERT INTO liked (saver, saved) VALUES (?, ?)`, [saver, saved], (err, result) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to Like Profile" });
                }
                return res.status(200).json({ message: "Profile liked successfully", result });
            });
        }
    });
};


const getLiked = (req, res) => {

    db.query('SELECT * FROM liked', (err, likedResults) => {
        if (err) {
            return res.status(500).json({ message: "Failed to fetch liked profiles" });
        }
        db.query('SELECT * FROM users', (err, usersResults) => {
            if (err) {
                return res.status(500).json({ message: "Failed to fetch users" });
            }
            db.query('SELECT * FROM profiles', (err, profilesResults) => {
                if (err) {
                    return res.status(500).json({ message: "Failed to fetch profiles" });
                }
                const combinedResults = likedResults.map(liked => {
                    const user = usersResults.find(user => user.email === liked.saved);
                    const profile = profilesResults.find(profile => profile.email === liked.saved);

                    return {
                        ...liked,
                        user: user || {},
                        profile: profile || {},
                    };
                });
                res.status(200).json(combinedResults);
            });
        });
    });
};

const LikeStatus = (req,res) => {

    const {saver,saved} = req.body;
    db.query("select * from liked where saver = ? AND saved =  ?",[saver,saved], (err,result) => {
        if(err){res.status(500).send("Failed to get Like Status");}
        else{

            if(result.length===0){
                res.status(200).json({liked: false});
            }else{
                res.status(200).json({liked: true});
            }
            
        }
    });
};

const saveMatch = (req,res) => {

    const {matcher,matched,suggestion,review} = req.body;

    db.query('INSERT INTO matches(matcher,matched,suggestion,review) values(?,?,?,?)',[matcher,matched,suggestion,review],(err,result) => {

        if(err){
            res.status(402).send("Failed to Save Suggestion");
        }else{
            res.status(200).json(result);
        }
    });
};

const updateMatch = (req,res) => {

    const {matcher,matched,review} = req.body;

    db.query('UPDATE matches SET review = ? where matcher = ? AND matched = ?',[review,matcher,matched],(err,result) => {

        if(err){
            res.status(402).send("Failed to Update Matches");
        }else{
            res.status(200).send("matches updated successfully");
        }
    });
};

const checkMatch = (req,res) => {

    const {matcher,matched} = req.body;

    db.query('SELECT * FROM matches WHERE matcher = ? AND matched = ? AND review = ?',[matcher,matched,'Y'],(err,result) => {

        if(err){ throw err}else{

            if(result.length===0){

                res.status(402).send("Not Found");
            }else{

                res.status(200).json(result);
            }
        }
    });
};

module.exports = { saveLiked,getLiked,saveMatch,updateMatch,checkMatch,LikeStatus };