const express = require('express');
const router = express.Router();
const { saveLiked,getLiked,saveMatch,updateMatch,checkMatch,LikeStatus } = require('../Controllers/likeController');
const { LoveGuru } = require('../Modules/LoveGuru');

router.post('/likeProfile',saveLiked);
router.get('/getLiked',getLiked);
router.post('/checkLikeStatus',LikeStatus);
router.post('/loveGuru',LoveGuru);
router.post('/saveMatch',saveMatch);
router.post('/updateMatch',updateMatch);
router.post('/checkMatch',checkMatch);

module.exports = router;