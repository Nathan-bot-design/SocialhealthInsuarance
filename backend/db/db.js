const dotenv = require('dotenv');
dotenv.config(); // Ensure this is at the very top

const mysql = require('mysql2');

console.log('DB_HOST:', process.env.DB_HOST); // Debugging log
console.log('DB_USER:', process.env.DB_USER); // Debugging log
console.log('DB_PASSWORD:', process.env.DB_PASSWORD); // Debugging log
console.log('DB_NAME:', process.env.DB_NAME); // Debugging log

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = db;
