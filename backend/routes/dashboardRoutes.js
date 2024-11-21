const express = require('express');
const router = express.Router();
const { getDashboardStats, getUserRole } = require('../controllers/dashboardController');
const authenticate = require('../middleware/authenticate'); // Middleware to check user authentication

// Route to fetch dashboard statistics
router.get('/stats', authenticate, getDashboardStats);

// Route to fetch user role
router.get('/role', authenticate, getUserRole);

module.exports = router;
