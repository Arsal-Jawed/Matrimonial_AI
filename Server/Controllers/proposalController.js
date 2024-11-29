const db = require('../config');
const { sendEmail, getEmailTemplate, proposeMeeting, getMeetingTemplate } = require('../Modules/NodeMailer');

const saveProposal = (req,res) => {

    const {proposal,proposed,state} = req.body;

    db.query(`SELECT * FROM proposals WHERE proposal = ? AND proposed = ?`, [proposal, proposed], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Failed to Check Proposal" });
    }
        if (results.length > 0) {
            return res.status(400).json({ message: "This proposal already exists." });
        }
        db.query(`INSERT INTO proposals (proposal, proposed, state) VALUES (?, ?, ?)`, [proposal, proposed, state], (err, result) => {
            if (err) {
                res.status(500).json({ message: "Failed to Save Proposal" });
            } else {
                res.status(200).json(result);
            }
        });
    });
};

const sendMail = async(req, res) => {
    const { to, username, proposedName, message, country, city, occupation, religion } = req.body;
    console.log("Mail API Called");

    try {
        const htmlContent = getEmailTemplate(username, proposedName, message, country, city, occupation, religion);

        await sendEmail(to, 'Welcome to Matrimonial AI', htmlContent);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

const sendMeeting = async(req, res) => {
    const { to, username, proposedName, country, city, occupation, religion, place, address, placeCity } = req.body;
    console.log("Meeting Mail API Called");

    try {
        const htmlContent = getMeetingTemplate(username, proposedName, country, city, occupation, religion, place, address, placeCity);

        await proposeMeeting(to, 'Meeting Proposal', htmlContent);

        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email' });
    }
};

const acceptProposal = (req, res) => {
    const { proposal, proposed } = req.body;
    console.log(proposal+proposed);
    console.log("Accept API Called");

    db.query(`SELECT * FROM proposals WHERE proposal = ? AND proposed = ? AND state = 'N'`, [proposal, proposed], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Failed to Check Proposal" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Proposal not found or already accepted/rejected." });
        }
        db.query(`UPDATE proposals SET state = 'A' WHERE proposal = ? AND proposed = ?`, [proposal, proposed], (err, result) => {
            if (err) {
                res.status(500).json({ message: "Failed to Accept Proposal" });
            } else {
                res.status(200).json({ message: "Proposal accepted successfully" });
            }
        });
    });
};

const rejectProposal = (req, res) => {
    const { proposal, proposed } = req.body;

    console.log("Reject API Called");

    db.query(`SELECT * FROM proposals WHERE proposal = ? AND proposed = ? AND state = 'N'`, [proposal, proposed], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Failed to Check Proposal" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Proposal not found or already accepted/rejected." });
        }
        db.query(`UPDATE proposals SET state = 'R' WHERE proposal = ? AND proposed = ?`, [proposal, proposed], (err, result) => {
            if (err) {
                res.status(500).json({ message: "Failed to Reject Proposal" });
            } else {
                res.status(200).json({ message: "Proposal rejected successfully" });
            }
        });
    });
};

const getAllProposals = (req, res) => {
    
    db.query("SELECT * FROM proposals", (err, proposalsResult) => {
      if (err) {
        return res.status(500).json({ message: "Failed to retrieve proposals" });
      }

    db.query("SELECT * FROM users", (err, userResult) => {
      if (err) {
        return res.status(500).json({ message: "Failed to retrieve profiles" });
      }
    
    db.query("SELECT * FROM users", (err, proposedNameResult) => {
      if (err) {
        return res.status(500).json({ message: "Failed to retrieve usernames"})
      }
      
        const combinedData = proposalsResult.map(proposal => {
          const profile = userResult.find(profile => profile.email === proposal.proposal);
          const proposedProfile = proposedNameResult.find(prpName => prpName.email === proposal.proposed);
          return { ...proposal, profile, proposedProfile };
        });
  
        res.status(200).json(combinedData);

        });
      });
    });
  };

  const blockProposal = (req, res) => {

    const { blocker, blocked } = req.body;

    db.query("INSERT INTO blocks (blocker, blocked) VALUES (?, ?)", [blocker, blocked], (err, result) => {
        if (err) {
            return res.status(500).send("Failed to Block Proposer");
        }
        db.query("UPDATE proposals SET state = 'B' WHERE proposal = ? AND proposed = ?", [blocked, blocker], (err, updateResult) => {
            if (err) {
                return res.status(500).json({ message: "Failed to Update Proposal State to Blocked" });
            }

            res.status(200).json({ message: "Proposer blocked and proposal state updated to 'B'", result: updateResult });
        });
    });
};

const deleteProposal = (req,res) => {

    const {proposal,proposed} = req.body;

    db.query("delete from proposals where proposal = ? AND proposed = ?", [proposal,proposed] ,(err,result) => {
         if(err){res.status(500).send("Failed to Delete Proposal");}
         else{
            res.status(200).json(result);
         }
    });
};

  

module.exports = {saveProposal,sendMail,acceptProposal,rejectProposal,getAllProposals,sendMeeting,blockProposal,deleteProposal};