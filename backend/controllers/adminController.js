const db = require('../db/db');

// Generate reports
const generateReport = (req, res) => {
    const { startDate, endDate, reportType } = req.query;

    let query = '';
    switch (reportType) {
        case 'claims':
            query = `SELECT * FROM claims_table WHERE DateSubmitted BETWEEN ? AND ?`;
            break;
        case 'payments':
            query = `SELECT * FROM payments_table WHERE PaymentDate BETWEEN ? AND ?`;
            break;
        case 'users':
            query = `SELECT * FROM user_table WHERE CreatedAt BETWEEN ? AND ?`;
            break;
        default:
            return res.status(400).json({ error: 'Invalid report type' });
    }

    db.query(query, [startDate, endDate], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Admin dashboard data
const getAdminDashboardData = (req, res) => {
    const queries = {
        userCount: 'SELECT COUNT(*) AS userCount FROM user_table',
        claimsCount: 'SELECT COUNT(*) AS claimsCount FROM claims_table WHERE Status = "Pending"',
        paymentsTotal: 'SELECT SUM(Amount) AS totalPayments FROM payments_table',
    };

    const results = {};
    let queryCount = 0;

    Object.entries(queries).forEach(([key, query]) => {
        db.query(query, (err, data) => {
            if (err) return res.status(500).json({ error: err.message });
            results[key] = data[0];
            queryCount++;

            if (queryCount === Object.keys(queries).length) {
                res.json(results);
            }
        });
    });
};

module.exports = { generateReport, getAdminDashboardData };
