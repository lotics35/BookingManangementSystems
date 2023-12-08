const express = require('express');
const router = express.Router();
const { getAllBookController } = require('../controllers/bookController');

router.get('/all', getAllBookController);

module.exports = router;