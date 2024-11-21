const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const db = require('../db/db'); // Import your database module
require('dotenv').config(); // Load environment variables

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Fetch user from database
        const [rows] = await db.promise().query('SELECT * FROM user_table WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = rows[0];
        console.log('User found:', user);

        // Check if password hash exists
        if (!user.PasswordHash) {
            return res.status(400).json({ message: 'Password not found for the user' });
        }

        // Compare input password with hashed password
        const isMatch = await bcrypt.compare(password, user.PasswordHash);

        if (!isMatch) {
            console.log(`Invalid credentials for email: ${email}`);
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Verify the presence of the JWT secret
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET is not defined in .env file');
            return res.status(500).json({ message: 'JWT_SECRET is missing from server configuration' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.UserID, email: user.Email }, // Payload
            process.env.JWT_SECRET,                // Secret key from .env
            { expiresIn: '1h' }                    // Token expiration
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: { email: user.Email, name: user.Name }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Utility function to hash a plain password (useful for updating existing records)
const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);
    return hashedPassword;
};

// Example for manual password hashing (use this for initial setup if needed)
// hashPassword('kingori555').then(console.log);

module.exports = router;
