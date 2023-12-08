import React, { useState, useEffect } from 'react';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    // Fetch existing vehicles from the backend when the component mounts
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/vehicle/all');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error.message);
    }
  };

  return (
    <div>
      <h3>Manage Vehicles</h3>

      {/* Display vehicles in a table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Model Year</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Capacity</th>
            <th>Plate Number</th>
            <th>Rate</th>
            {/* Add more fields as needed */}
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.Vehicle_id}>
              <td>{vehicle.Vehicle_name}</td>
              <td>{vehicle.description}</td>
              <td>{vehicle.Vehicle_model_year}</td>
              <td>{vehicle.Vehicle_brand}</td>
              <td>{vehicle.color}</td>
              <td>{vehicle.capacity}</td>
              <td>{vehicle.plate_number}</td>
              <td>${vehicle.rate}</td>
              {/* Add more fields as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageVehicles;
