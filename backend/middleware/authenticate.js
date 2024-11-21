const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization']; // Get the Authorization header
    if (!authHeader) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token (Bearer <token>)
    if (!token) {
        return res.status(401).json({ message: 'Access denied. Invalid token format.' });
    }

    try {
        // Verify the token using the secret from `.env`
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded data to `req.user`
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({ message: 'Invalid token.' });
    }
};
