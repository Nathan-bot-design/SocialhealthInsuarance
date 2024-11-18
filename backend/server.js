const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('Database user:', process.env.DB_USER || 'Environment variable not loaded!');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import routes
try {
    const userRoutes = require('./routes/userRoutes');
    const claimsRoutes = require('./routes/claimsRoutes');
    const paymentsRoutes = require('./routes/paymentsRoutes');
    const adminRoutes = require('./routes/adminRoutes');

    // Use routes
    app.use('/api/users', userRoutes);
    app.use('/api/claims', claimsRoutes);
    app.use('/api/payments', paymentsRoutes);
    app.use('/api/admin', adminRoutes);
} catch (err) {
    console.error('Error loading routes:', err.message);
}

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
