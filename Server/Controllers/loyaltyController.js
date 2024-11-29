const db = require('../config');

const checkLoyalty = async (req, res) => {
    const { person, verifier } = req.body;

    console.log("Received Request Body:", req.body);

    try {
       
        const queries = {
            chats: `SELECT COUNT(*) AS count FROM liked WHERE saver = ?`,
            likes: `SELECT COUNT(*) AS count FROM liked WHERE saver = ?`,
            matches: `SELECT COUNT(*) AS count FROM matches WHERE matcher = ?`,
            proposals: `SELECT COUNT(*) AS count FROM proposals WHERE proposal = ?`,
            nsfw: `SELECT COUNT(*) AS count FROM nsfw WHERE email = ?`
        };

        console.log("Executing aggregate queries...");
        const results = await Promise.all(
            Object.keys(queries).map(key =>
                new Promise((resolve, reject) => {
                    console.log(`Executing query for ${key}: ${queries[key]} with person=${person}`);
                    db.query(queries[key], [person], (err, result) => {
                        if (err) {
                            console.error(`Query Error for ${key}:`, err);
                            return reject(err);
                        }
                        console.log(`Result for ${key}:`, result[0]?.count);
                        resolve({ [key]: result[0]?.count || 0 });
                    });
                })
            )
        );

        const checkQueries = {
            chats: `SELECT COUNT(*) AS count FROM liked WHERE saver = ? AND saved = ?`,
            likes: `SELECT COUNT(*) AS count FROM liked WHERE saver = ? AND saved = ?`,
            matches: `SELECT COUNT(*) AS count FROM matches WHERE matcher = ? AND matched = ?`,
            proposals: `SELECT COUNT(*) AS count FROM proposals WHERE proposal = ? AND proposed = ?`
        };

        console.log("Executing interaction-specific queries...");
        const checkResult = await Promise.all(
            Object.keys(checkQueries).map(key =>
                new Promise((resolve, reject) => {
                    console.log(
                        `Executing query for ${key}: ${checkQueries[key]} with person=${person}, verifier=${verifier}`
                    );
                    db.query(checkQueries[key], [person, verifier], (err, result) => {
                        if (err) {
                            console.error(`Interaction Query Error for ${key}:`, err);
                            return reject(err);
                        }
                        console.log(`Result for ${key}:`, result[0]?.count);
                        resolve({ [key]: result[0]?.count || 0 });
                    });
                })
            )
        );

        const counts = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
        const checkCounts = checkResult.reduce((acc, curr) => ({ ...acc, ...curr }), {});

        const checkCountsInteractions =
        (checkCounts.chats || 0) +
        (checkCounts.likes || 0) +
        (checkCounts.matches || 0) +
        (checkCounts.proposals || 0);

    let interest = 0;

    if (checkCounts.chats > 0) interest += 10;
    if (checkCounts.likes > 0) interest += 100;
    if (checkCounts.matches > 0) interest += 1000;
    if (checkCounts.proposals > 0) interest += 10000;
        const totalInteractions =
            counts.chats + counts.likes + counts.matches + counts.proposals + counts.nsfw;
        
        let cc=0,lc=0,mc=0,pc=0,nc=0;

        if(counts.chats > checkCounts.chats){cc = counts.chats - checkCounts.chats};
        if(counts.matches > checkCounts.matches){mc = counts.matches - checkCounts.matches};
        if(counts.likes > checkCounts.likes){lc = counts.likes - checkCounts.likes};
        if(counts.proposals > checkCounts.proposals){pc = counts.proposals - checkCounts.proposals};
        nc = counts.nsfw;

        console.log("Aggregate Counts:", counts);
        console.log("Interaction Counts:", checkCounts);
        console.log(
            `Interest: ${interest}, Total Interactions: ${totalInteractions}`
        );
        const insertQuery = `INSERT INTO loyalty (person, verifier, interest, chats, proposals, matches, nsfws, likes) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(
            insertQuery,
            [person, verifier, interest, counts.chats, counts.proposals, counts.matches, counts.nsfw, counts.likes],
            (err, result) => {
                if (err) {
                    console.error("Error inserting into loyalty table:", err);
                    return res.status(500).json({ error: "Failed to insert data into loyalty table" });
                }
                console.log("Insert Successful:", result);
                const report = {

                    interest,
                    cc,
                    pc,
                    mc,
                    nc,
                    lc
                };
                res.status(200).json({ message: "Loyalty calculation successful", data: report });
            }
        );
    } catch (err) {
        console.error("Error in checking loyalty:", err);
        res.status(500).json({ error: "Server Error", details: err.message });
    }
};


const getUsers = (req,res) => {
    
    console.log("Get USer API Called");
    const {gender} = req.query;
    let g = '';
    if(gender==='male'){
        g = 'female';
    }else if(gender==='female'){
        g = 'male';
    }else{};

    db.query('select * from users u join profiles p on u.email = p.email where u.gender = ?',[g], (err,result) => {
        if(err){res.status(500).send("Error Fetching Users");}
        else{
            res.status(200).json(result);
        }
    });
};

module.exports = { checkLoyalty,getUsers };