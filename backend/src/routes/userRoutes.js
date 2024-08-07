const express = require('express');
const { updateProfile,  changePassword} = require('../controllers/userController');

const router = express.Router();

router.put('/update-profile', updateProfile);
router.put('/change-password', changePassword);


module.exports = router;