const express = require('express');
const router = express.Router();
const {saveLocation,getLocations} = require('../Controllers/locationController');
const {LocationGuru} = require('../Modules/LoveGuru');

router.post('/saveLocation',saveLocation);
router.get('/getLocations',getLocations);
router.get('/guruLocation',LocationGuru);

module.exports = router;