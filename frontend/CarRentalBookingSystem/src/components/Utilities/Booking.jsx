import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/booking.css';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    vehicleType: '',
    pickupLocation: '',
    pickupDate: '',
    dropoffLocation: '',
    dropoffDate: '',
    additionalRequests: '',
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
    // Fetch vehicle types when the component mounts
    const fetchVehicleTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/vehicle/types');

        if (response.status === 200) {
          setVehicleTypes(response.data);
        } else {
          console.error('Failed to fetch vehicle types');
        }
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
      }
    };

    fetchVehicleTypes();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log('Form submitted:', bookingData);
  };

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        {/* ... other input fields ... */}
        <label>
          Pick-up Location:
          <input
            type="text"
            name="pickupLocation"
            value={bookingData.pickupLocation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Pick-up Date:
          <input
            type="date"
            name="pickupDate"
            value={bookingData.pickupDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Drop-off Location:
          <input
            type="text"
            name="dropoffLocation"
            value={bookingData.dropoffLocation}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Drop-off Date:
          <input
            type="date"
            name="dropoffDate"
            value={bookingData.dropoffDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Additional Requests:
          <textarea
            name="additionalRequests"
            value={bookingData.additionalRequests}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Booking;
