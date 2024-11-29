const express = require('express');
const router = express.Router();
const {createOrGetRoom,saveChatHistory,saveRequest,deleteRequest,getRequest,getChatHisstory,giveWarning} = require('../Controllers/chatController');

router.post('/chatRoom',createOrGetRoom);
router.post('/saveChatHistory',saveChatHistory);
router.post('/saveChatRequest',saveRequest);
router.post('/deleteRequest',deleteRequest);
router.get('/getRequest',getRequest);
router.get('/getChatHistory',getChatHisstory);
router.post('/giveWarning',giveWarning);

module.exports = router;