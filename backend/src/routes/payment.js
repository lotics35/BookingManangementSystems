const express = require('express');
const router = express.Router();
const { getAllPaymentController } = require('../controllers/paymentController');

router.get('/all', getAllPaymentController);

module.exports = router;