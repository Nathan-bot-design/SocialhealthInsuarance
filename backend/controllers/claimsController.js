const axios = require('axios');
const db = require('../db/db');

// Generate access token
const generateAccessToken = async () => {
    const consumerKey = 'WA3AzWLClJF1Mn0aiOz2LRNNEfQl2SGUiU9I3a3d9zjEVMHv';
    const consumerSecret = 'pj77WmhqWvjOgPbNEeoQ9lZLRsAKsnaqz9KFE50JCTOSxB3ghGpQcZMQoKquovBY';
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

    try {
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: { Authorization: `Basic ${auth}` },
        });
        return response.data.access_token;
    } catch (err) {
        throw new Error('Error generating access token');
    }
};

// Initiate STK Push
const initiatePayment = async (req, res) => {
    const { phoneNumber, amount, paymentType, userId } = req.body;

    try {
        const accessToken = await generateAccessToken();
        const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
        const shortcode = '174379'; // Replace with your shortcode
        const passkey = 'YOUR_PASSKEY';
        const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

        const paymentData = {
            BusinessShortCode: shortcode,
            Password: password,
            Timestamp: timestamp,
            TransactionType: 'CustomerPayBillOnline',
            Amount: amount,
            PartyA: phoneNumber,
            PartyB: shortcode,
            PhoneNumber: phoneNumber,
            CallBackURL: 'https://yourdomain.com/api/payments/callback',
            AccountReference: 'Health Insurance',
            TransactionDesc: paymentType,
        };

        await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            paymentData,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const query = `INSERT INTO payments_table (UserID, PaymentDate, Amount, PaymentType) VALUES (?, NOW(), ?, ?)`;
        db.query(query, [userId, amount, paymentType], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json({ message: 'Payment initiated successfully.' });
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { initiatePayment };
