const { getAllBooking } = require('../models/Books');

const getAllBookController = async (req, res) => {
    try {
      // Fetch all bookings from the database using the connection attached to req.db
      const allBooking = await getAllBooking(req.db);
  
      res.status(200).json(allBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllBookController
};