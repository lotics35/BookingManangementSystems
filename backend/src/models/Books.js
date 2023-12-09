async function getAllBooking(connection) {
  // Retrieve all Booking from the database
  const [rows] = await connection.execute('SELECT * FROM bookings');

  // Return an array of all Booking
  return rows;
}

async function createBooking(connection, bookingData) {
  // Insert a new booking into the database
  const [result] = await connection.execute(
    'INSERT INTO bookings (startDate, endDate, Vehicle_id, pickupLocation, additionalRequests, userId) VALUES (?, ?, ?, ?, ?, ?)',
    [
      bookingData.startDate,
      bookingData.endDate,
      bookingData.vehicleId,
      bookingData.pickupLocation,
      bookingData.additionalRequests,
      bookingData.userId
    ]
  );

  // Return the ID of the newly created booking
  return result.insertId;
}

module.exports = {
  getAllBooking,
  createBooking
};
