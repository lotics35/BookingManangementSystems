// In your routes/vehicle.js or similar file

const express = require('express');
const router = express.Router();
const { getVehicleTypesController, getAllVehiclesController } = require('../controllers/vehicleController');

// Route for fetching vehicle types
router.get('/types', getVehicleTypesController);

//Route for fetching vehicle information
router.get('/all', getAllVehiclesController);

// router.delete('/delete', deleteVehicleController);

module.exports = router;
