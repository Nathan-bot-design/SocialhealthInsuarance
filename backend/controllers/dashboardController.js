const db = require('../db/db'); // Import the database connection

// Controller to fetch dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        // Example queries to get the required data
        const [claimsCount] = await db.promise().query('SELECT COUNT(*) AS totalClaims FROM claims');
        const [paymentsCount] = await db.promise().query('SELECT COUNT(*) AS totalPayments FROM payments');

        // Send the response back to the frontend
        res.status(200).json({
            claims: claimsCount[0].totalClaims,
            payments: paymentsCount[0].totalPayments,
            message: 'Dashboard data fetched successfully',
        });
    } catch (error) {
        console.error('Error fetching dashboard data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Controller to fetch user role (for Admin Panel Access)
exports.getUserRole = async (req, res) => {
    const userId = req.user.id; // Assuming the user is authenticated and the `id` is available in req.user
    try {
        const [rows] = await db.promise().query('SELECT Role FROM user_table WHERE UserID = ?', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const role = rows[0].Role; // Assuming the `Role` column exists
        res.status(200).json({ role, message: 'User role fetched successfully' });
    } catch (error) {
        console.error('Error fetching user role:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
