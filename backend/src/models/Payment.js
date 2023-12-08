async function getAllPayment(connection) {
    // Retrieve all PaymentgetAllPayment from the database
    const [rows] = await connection.execute('SELECT * FROM payments');
  
    // Return an array of all PaymentgetAllPayment
    return rows;
}

module.exports = {
    getAllPayment
};