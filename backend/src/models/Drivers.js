async function getAllDrivers(connection) {
    // Retrieve all drivers from the database
    const [rows] = await connection.execute('SELECT * FROM driver');
  
    // Return an array of all drivers
    return rows;
}

module.exports = {
    getAllDrivers
};