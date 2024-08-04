const express = require('express');
const { rate, retriveMovie } = require('../controllers/movieController');

const router = express.Router();

router.put('/rate', rate);
router.get('/:id', retriveMovie);


module.exports = router;