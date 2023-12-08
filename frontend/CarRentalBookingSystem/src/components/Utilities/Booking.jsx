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
    userId: '', // Add userId to the state
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

    // Retrieve userId from localStorage
    const storedUserId = localStorage.getItem('userId');

    // Set userId in the state
    setBookingData((prevData) => ({ ...prevData, userId: storedUserId }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include vehicleType in the bookingData
      const vehicleType = document.querySelector('[name="vehicleType"]').value;

      // Update bookingData with the selected vehicleType
      setBookingData((prevData) => ({ ...prevData, vehicleType }));

      // Include userId and vehicleType in the API request
      const response = await axios.post('http://localhost:8081/api/bookings', bookingData);

      if (response.status === 200) {
        console.log('Booking data saved successfully:', response.data);
        // Add any additional logic after successful submission
      } else {
        console.error('Failed to save booking data');
      }
    } catch (error) {
      console.error('Error saving booking data:', error);
    }
  };

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>
      <form className="booking-form" onSubmit={handleSubmit}>
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={bookingData.startDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={bookingData.endDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Vehicle Type: <br />
          <select
            name="vehicleType"
            value={bookingData.vehicleType}
            onChange={handleInputChange}
          >
            <option value="">Select a vehicle type</option>
            {vehicleTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
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
