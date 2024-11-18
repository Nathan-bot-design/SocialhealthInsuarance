const db = require('../db/db'); // Adjust this if the db path is different
const sharp = require('sharp'); // Install using: npm install sharp

// Get all users
const getUsers = (req, res) => {
    db.query('SELECT * FROM user_table', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Add a new user
const addUser = async (req, res) => {
    const { national_id, name, email, phone_number, password, date_of_birth, biometric_data } = req.body;

    try {
        let biometricDataBuffer = null;

        // Check if biometric data is provided
        if (biometric_data) {
            const imageBuffer = Buffer.from(biometric_data.split(',')[1], 'base64');

            // Compress the image using sharp
            biometricDataBuffer = await sharp(imageBuffer)
                .resize(200, 200) // Resize to 200x200 pixels
                .jpeg({ quality: 70 }) // Set JPEG quality to 70%
                .toBuffer();
        }

        const query = `
            INSERT INTO user_table 
            (NationalID, Name, Email, ContactInfo, PasswordHash, DateOfBirth, BiometricData, CreatedAt) 
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `;

        db.query(
            query,
            [national_id, name, email, phone_number, password, date_of_birth, biometricDataBuffer],
            (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: "User added successfully!", userId: result.insertId });
            }
        );
    } catch (error) {
        console.error('Error processing biometric data:', error.message);
        res.status(500).json({ error: 'Failed to process biometric data or add user' });
    }
};

module.exports = { getUsers, addUser };
