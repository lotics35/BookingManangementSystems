// routes/booking.js
const express = require('express');
const router = express.Router();
const { getAllBookController, createBookingController } = require('../controllers/bookController');

// Get all bookings
router.get('/all', getAllBookController);

// Create a new booking
router.post('/create', createBookingController);

module.exports = router;
