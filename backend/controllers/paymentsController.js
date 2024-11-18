const db = require('../db/db');

// Get all payments
const getPayments = (req, res) => {
    db.query('SELECT * FROM payments_table', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add other functions as needed, e.g., getPaymentById, createPayment, updatePayment, deletePayment

module.exports = { getPayments };
