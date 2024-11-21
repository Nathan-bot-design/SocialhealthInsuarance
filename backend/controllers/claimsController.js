const db = require('../db/db');

// Get all claims
const getClaims = (req, res) => {
    const query = 'SELECT * FROM claims_table';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

// Create a new claim
const createClaim = (req, res) => {
    const { UserID, DateSubmitted, TotalAmount, Description } = req.body;
    const query = `
        INSERT INTO claims_table (UserID, DateSubmitted, TotalAmount, Description, Status) 
        VALUES (?, ?, ?, ?, 'Pending')
    `;
    db.query(query, [UserID, DateSubmitted, TotalAmount, Description], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Claim created successfully.', claimId: results.insertId });
    });
};

// Update claim status
const updateClaimStatus = (req, res) => {
    const { claimId } = req.params;
    const { status } = req.body;
    const query = 'UPDATE claims_table SET Status = ? WHERE ClaimID = ?';
    db.query(query, [status, claimId], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Claim status updated successfully.' });
    });
};

// Upload a claim document
const uploadClaimDocument = (req, res) => {
    const { claimId } = req.params;
    const { file } = req;
    if (!file) return res.status(400).json({ error: 'No file uploaded.' });

    const query = `
        INSERT INTO documents_table (ClaimID, FileName, FilePath)
        VALUES (?, ?, ?)
    `;
    db.query(query, [claimId, file.originalname, file.path], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Document uploaded successfully.' });
    });
};

// Get claim details
const getClaimDetails = (req, res) => {
    const { claimId } = req.params;
    const query = `
        SELECT c.*, d.DocumentID, d.FileName, d.FilePath
        FROM claims_table c
        LEFT JOIN documents_table d ON c.ClaimID = d.ClaimID
        WHERE c.ClaimID = ?
    `;
    db.query(query, [claimId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

module.exports = {
    getClaims,
    createClaim,
    updateClaimStatus,
    uploadClaimDocument,
    getClaimDetails
};
