import React, { useState, useEffect } from 'react';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch existing bookings from the backend when the component mounts
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/booking/all');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
    }
  };

  return (
    <div>
      <h3>Manage Bookings</h3>

      {/* Display bookings in a table */}
      <table>
        <thead>
          <tr>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Vehicle ID</th>
            <th>Pickup Location</th>
            <th>Pickup Date</th>
            <th>Dropoff Location</th>
            <th>Dropoff Date</th>
            <th>Additional Requests</th>
            <th>User ID</th>
            {/* Add more fields as needed */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.vehicleId}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.pickupDate}</td>
              <td>{booking.dropoffLocation}</td>
              <td>{booking.dropoffDate}</td>
              <td>{booking.additionalRequests}</td>
              <td>{booking.userId}</td>
              {/* Add more fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBookings;
