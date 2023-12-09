import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

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

  const handleEditBooking = (booking) => {
    // Implement edit functionality
    console.log('Edit booking:', booking);
  };

  const handleDeleteBooking = async (bookingId) => {
    // Implement delete functionality
    console.log('Delete booking with ID:', bookingId);
  };

  const handleCreateBooking = () => {
    // Implement create functionality
    console.log('Create booking');
  };

  return (
    <div>
      <h3>Manage Bookings</h3>

      {/* Display bookings in a table */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Vehicle ID</th>
            <th>Pickup Location</th>
            <th>Additional Requests</th>
            <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.bookingId}>
              <td>{booking.bookingId}</td>
              <td>{booking.startDate}</td>
              <td>{booking.endDate}</td>
              <td>{booking.vehicleId}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.additionalRequests}</td>
              <td>{booking.userId}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditBooking(booking)}>Edit</Button>
                <Button variant="danger" onClick={() => handleDeleteBooking(booking.bookingId)}>Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="7"></td>
            <td>
              <Button variant="success" onClick={handleCreateBooking}>Create</Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ManageBookings;
