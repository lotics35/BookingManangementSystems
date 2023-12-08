const express = require('express');
const router = express.Router();
const { getAllDriversController } = require('../controllers/driverController');

router.get('/drivers', getAllDriversController);

module.exports = router;