async function getAllDrivers(connection) {
    try {
      // Retrieve all drivers from the database
      const [rows] = await connection.execute('SELECT * FROM driver');
  
      // Return an array of all drivers
      return rows;
    } catch (error) {
      console.error('Error in getAllDrivers:', error.message);
      throw error; // Re-throw the error to be caught by the calling function
    }
  }
  
  module.exports = {
    getAllDrivers
  };