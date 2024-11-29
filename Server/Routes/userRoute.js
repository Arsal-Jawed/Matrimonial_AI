const express = require('express');
const router = express.Router();
const { createUser,createProfile,login,getProfiles,getProfileByEmail,ForgetPassword,UpdatePassword,saveState,online,offline,updateProfile,getCities } = require('../Controllers/userController');

router.post('/createUser', createUser);
router.post('/createProfile',createProfile);
router.post('/login',login);
router.get('/getProfiles',getProfiles);
router.get('/getProfileByEmail', getProfileByEmail);
router.post('/forgetPassword', ForgetPassword);
router.post('/updatePassword',UpdatePassword);
router.post('/saveState',saveState);
router.post('/online',online);
router.post('/offline',offline);
router.post('/updateProfile',updateProfile);
router.get('/getCities',getCities);


module.exports = router;
