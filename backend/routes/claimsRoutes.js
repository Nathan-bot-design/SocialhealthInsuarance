const express = require('express');
const { getClaims, createClaim } = require('../controllers/claimsController');
const router = express.Router();

router.get('/', getClaims);
router.post('/', createClaim);

module.exports = router;
