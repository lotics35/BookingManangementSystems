const { getAllDrivers } = require('../models/Drivers');

const getAllDriversController = async (req, res) => {
  try {
    // Fetch all drivers from the database using the connection attached to req.db
    const allDrivers = await getAllDrivers(req.db);

    res.status(200).json(allDrivers);
  } catch (error) {
    console.error('Error in getAllDriversController:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllDriversController
};