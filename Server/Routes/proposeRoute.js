const express = require('express');
const router = express();
const {saveProposal,sendMail,acceptProposal,rejectProposal,getAllProposals,sendMeeting,blockProposal,deleteProposal} = require('../Controllers/proposalController');

router.post('/saveProposal',saveProposal);
router.post('/sendMail',sendMail);
router.post('/accept',acceptProposal);
router.post('/reject',rejectProposal);
router.get('/getProposals',getAllProposals);
router.post('/sendMeeting',sendMeeting);
router.post('/block',blockProposal);
router.post('/deleteProposal',deleteProposal);

module.exports = router;