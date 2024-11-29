const express = require('express');
const router = express.Router();
const {checkLoyalty,getUsers} = require('../Controllers/loyaltyController');
const {getQuestions,giveAnswer,lowRate,highRate,customAnswer} = require('../Controllers/guruController');
const { TunedGuru } = require('../Modules/LoveGuru');

router.post('/checkLoyalty',checkLoyalty);
router.get('/getUsers',getUsers);
router.get('/getQuestions',getQuestions);
router.post('/giveAnswer',giveAnswer);
router.post('/lowRate',lowRate);
router.post('/highRate',highRate);
router.post('/customAnswer',customAnswer);
router.get('/customQuestion',TunedGuru);

module.exports = router;