// In your routes/vehicle.js or similar file

const express = require('express');
const router = express.Router();
const { getVehicleTypes } = require('../controllers/vehicleController');

// Route for fetching vehicle types
router.get('/types', getVehicleTypes);

module.exports = router;
