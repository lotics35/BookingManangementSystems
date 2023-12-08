const { getAllDrivers } = require('../models/Drivers');

const getAllDriversController = async (req, res) => {
    try {
      // Fetch all vehicles from the database using the connection attached to req.db
      const allVehicles = await getAllDrivers(req.db);
  
      res.status(200).json(allVehicles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllDriversController
};