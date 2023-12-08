async function getAllBooking(connection) {
    // Retrieve all Booking from the database
    const [rows] = await connection.execute('SELECT * FROM bookings');
  
    // Return an array of all Booking
    return rows;
}

module.exports = {
    getAllBooking
};