// vehicleController.js
const { getVehicleTypes, getAllVehicles } = require('../models/Vehicle'); // Make sure to provide the correct path to your models folder

const getVehicleTypesController = async (req, res) => {
  try {
    // Fetch vehicle types from the database using the connection attached to req.db
    const vehicleTypes = await getVehicleTypes(req.db);

    res.status(200).json(vehicleTypes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllVehiclesController = async (req, res) => {
  try {
    // Fetch all vehicles from the database using the connection attached to req.db
    const allVehicles = await getAllVehicles(req.db);

    res.status(200).json(allVehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getVehicleTypesController,
  getAllVehiclesController,
};

