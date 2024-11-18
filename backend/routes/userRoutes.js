const express = require('express');
const router = express.Router();
const { getUsers, addUser } = require('../controllers/userController'); // Ensure this path is correct

// Route to get users
router.get('/', getUsers);

// Route to add a new user
router.post('/', addUser);

module.exports = router;
