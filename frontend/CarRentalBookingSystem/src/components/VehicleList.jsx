// VehicleList.jsx
import '../assets/vehicleList.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleList = () => {
    const [vehicles, setVehicles] = useState([]);
  
    useEffect(() => {
      const fetchVehicles = async () => {
        try {
          const response = await axios.get('http://localhost:8081/api/vehicle/all');
  
          if (response.status === 200) {
            console.log('Response data:', response.data);
            setVehicles(response.data);
          } else {
            console.error('Failed to fetch vehicles');
          }
        } catch (error) {
          console.error('Error fetching vehicles:', error);
        }
      };
  
      fetchVehicles();
    }, []);
  
    return (
        <div className="vehicle-list-container">
          <h1>Vehicle List</h1>
          <ul>
            {vehicles.map((vehicle, index) => (
              <li key={index} className="vehicle-card">
                <h2>{vehicle.Vehicle_name}</h2>
                <div className="image-container">
                  <img
                    src={`http://localhost:8081${vehicle.image_path}`}
                    alt={vehicle.Vehicle_name}
                    className="vehicle-image"
                  />
                </div>
                <p>{`Type: ${vehicle.Vehicle_brand}`}</p>
                <p>{`Model Year: ${vehicle.Vehicle_model_year || 'Unknown'}`}</p>
                <p>{`Color: ${vehicle.color}`}</p>
                <p>{`Capacity: ${vehicle.capacity}`}</p>
                <p>{`Plate Number: ${vehicle.plate_number}`}</p>
                <p>{`Rate: $${vehicle.rate}`}</p>
                {/* Add more fields as needed */}
              </li>
            ))}
          </ul>
        </div>
      );
    };
    
    export default VehicleList;