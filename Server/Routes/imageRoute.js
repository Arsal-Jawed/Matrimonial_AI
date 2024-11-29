const express = require('express');
const router = express.Router();
const { addImage,deleteImage,getImages,updateProfileImage } = require('../Controllers/imageController');

router.post('/addImage',addImage);
router.post('/deleteImage',deleteImage);
router.get('/getImages',getImages);
router.post('/updateProfileImage',updateProfileImage);

module.exports = router;