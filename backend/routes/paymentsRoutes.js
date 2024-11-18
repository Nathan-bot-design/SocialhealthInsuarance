const express = require('express');
const { initiatePayment } = require('../controllers/paymentsController');
const router = express.Router();

router.post('/pay', initiatePayment);

module.exports = router;
