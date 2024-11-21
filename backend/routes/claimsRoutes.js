const express = require('express');
const multer = require('multer');
const {
    getClaims,
    createClaim,
    updateClaimStatus,
    uploadClaimDocument,
    getClaimDetails
} = require('../controllers/claimsController');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure this folder exists in your project
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage });

// Claims routes
router.get('/', getClaims); // Get all claims
router.post('/', createClaim); // Create a new claim
router.patch('/:claimId/status', updateClaimStatus); // Update claim status
router.post('/:claimId/documents', upload.single('document'), uploadClaimDocument); // Upload document
router.get('/:claimId', getClaimDetails); // Get details of a specific claim

module.exports = router;
