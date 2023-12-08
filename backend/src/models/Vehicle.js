// models/vehicle.js
async function getVehicleTypes(connection) {
    // Retrieve vehicle types from the database
    const [rows] = await connection.execute('SELECT vehicle_name FROM vehicle');
  
    // Return an array of vehicle names
    return rows.map(row => row.vehicle_name);
  }
  
  async function getAllVehicles(connection) {
    // Retrieve all vehicles from the database
    const [rows] = await connection.execute('SELECT * FROM vehicle');
  
    // Return an array of all vehicles
    return rows;
  }
  
  module.exports = {
    getVehicleTypes,
    getAllVehicles,
  };
  