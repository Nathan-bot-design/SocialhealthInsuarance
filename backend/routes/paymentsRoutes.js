const express = require('express');
const { initiatePayment } = require('../controllers/paymentsController'); // Ensure correct import
const router = express.Router();

// POST route for initiating payment
router.post('/pay', initiatePayment);

module.exports = router;
