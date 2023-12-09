const BookingModel = require('../models/Books');

const getAllBookController = async (req, res) => {
  try {
    const allBooking = await BookingModel.getAllBooking(req.db);
    res.status(200).json(allBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createBookingController = async (req, res) => {
  const bookingData = req.body;

  try {
    // Call the createBooking function directly
    const newBookingId = await BookingModel.createBooking(req.db, bookingData);

    res.status(201).json({
      id: newBookingId,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  getAllBookController,
  createBookingController,
};
