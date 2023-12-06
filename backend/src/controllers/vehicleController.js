// In your controllers/vehicleController.js or similar file

const getVehicleTypes = async (req, res) => {
    try {
      // Fetch vehicle types from your database
      const vehicleTypes = ['Car', 'Truck', 'Motorcycle', 'Van']; // Replace with actual fetching logic
  
      res.status(200).json(vehicleTypes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = { getVehicleTypes };
  