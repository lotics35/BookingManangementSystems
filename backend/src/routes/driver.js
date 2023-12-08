const express = require('express');
const router = express.Router();
const { getAllDriversController } = require('../controllers/driverController');

router.get('/all', getAllDriversController);

module.exports = router;