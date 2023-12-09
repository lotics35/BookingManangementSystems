import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/booking.css';

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    startDate: '',
    endDate: '',
    vehicleId: '',
    pickupLocation: '',
    additionalRequests: '',
    userId: '',
  });

  const [vehicleTypes, setVehicleTypes] = useState([]);

  useEffect(() => {
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

    const storedUserId = localStorage.getItem('userId');
    setBookingData((prevData) => ({ ...prevData, userId: storedUserId }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({ ...prevData, [name]: value }));

    if (name === 'vehicleType') {
      // Retrieve the correct vehicle ID based on the selected type
      const selectedVehicle = vehicleTypes.find((vehicle) => vehicle.type === value);
      const vehicleId = selectedVehicle ? selectedVehicle.id : 
      console.log('Selected Vehicle ID:', vehicleId);
      setBookingData((prevData) => ({ ...prevData, vehicleId }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use the correct vehicleId from the state
      const response = await axios.post('http://localhost:8081/api/booking/create', bookingData);

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
            value={bookingData.vehicleId}
            onChange={handleInputChange}
          >
            <option value="">Select a vehicle type</option>
            {vehicleTypes.map((type, index) => (
              <option key={index} value={type}>
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
