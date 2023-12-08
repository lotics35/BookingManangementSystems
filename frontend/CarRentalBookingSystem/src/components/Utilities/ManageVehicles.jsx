import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleInfo, setVehicleInfo] = useState(
    { name: '', description: '', modelYear: '', brand: '', color: '', capacity: '', plateNumber: '', rate: ''});

  useEffect(() => {
    // Fetch existing vehicles from the backend when the component mounts
    fetchVehicles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleInfo((prevState) => ({ ...prevState, [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(vehicleInfo);
    // axios.post('http://localhost:8081/api/user/signup' , vehicleInfo);
  };

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
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" 
          value={vehicleInfo.name} onChange={handleChange}/>
        Description:
        <input type="text" name="description" 
          value={vehicleInfo.description} onChange={handleChange}/>
        Model Year:
        <input type="text" name="modelYear" 
          value={vehicleInfo.modelYear} onChange={handleChange}/>
        Brand:
        <input type="text" name="brand" 
          value={vehicleInfo.brand} onChange={handleChange}/>
        Color:
        <input type="text" name="color" 
          value={vehicleInfo.color} onChange={handleChange}/>
        Capacity:
        <input type="text" name="capacity" 
          value={vehicleInfo.capacity} onChange={handleChange}/>
        Plate Number:
        <input type="text" name="plateNumber" 
          value={vehicleInfo.plateNumber} onChange={handleChange}/>
        Rate:
        <input type="text" name="rate" 
          value={vehicleInfo.rate} onChange={handleChange}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
    </div>
  );
};

export default ManageVehicles;
