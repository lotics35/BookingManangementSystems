const { getAllPayment } = require('../models/Payment');

const getAllPaymentController = async (req, res) => {
    try {
      // Fetch all Payments from the database using the connection attached to req.db
      const allPayment = await getAllPayment(req.db);
  
      res.status(200).json(allPayment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    getAllPaymentController
};