const express = require('express');
const { generateReport, getAdminDashboardData } = require('../controllers/adminController');
const router = express.Router();

// Route to generate reports
router.get('/reports', generateReport);

// Route for admin dashboard data
router.get('/dashboard', getAdminDashboardData);

module.exports = router;
