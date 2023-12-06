import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/booking.css';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    vehicleType: '',
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

  return (
    <div className="booking-container">
      <h1>Booking Form</h1>
      <form className="booking-form">
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
          Vehicle Type: <br/>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Booking;
