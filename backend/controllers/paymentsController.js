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
        console.error('Error generating access token:', err.message);
        throw new Error('Failed to generate access token');
    }
};

// Initiate STK Push Payment
const initiatePayment = async (req, res) => {
    const { phoneNumber, amount, paymentType, userId } = req.body;

    if (!phoneNumber || !amount || !paymentType || !userId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const accessToken = await generateAccessToken();
        const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
        const shortcode = '174379'; // Replace with your business shortcode
        const passkey = 'YOUR_PASSKEY'; // Replace with your passkey
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
            CallBackURL: 'https://yourdomain.com/api/payments/callback', // Update this to your server URL
            AccountReference: 'Health Insurance',
            TransactionDesc: paymentType,
            SecurityCredential: 'SK0fvlpJlJCMWqJaSwAcQx0LMIEDgpKEQhndG8QZofKtztINvu+3L+hbsa5rmw5T1o9W9TwfaMyo9QsyjnrqI34cflXeFw1rNWXmNZR2Bw+NEyB1AJj9MCY6tWSs1EV33VZAiqIAM5YS1eAn6RqQec9ItHEHqtr/CHB7hlPh86TzizAe9sQGKBIeViwwuMgqGEbAMbLqcg71ozQNGgK3ReV4ROFIZB7IBtMCTlzQs22VH7LxbfcPmbmTLNTTxWMx2j8UDaxQhhEDJ8FX8gsN51D6GEEsbZJdNl1oHTjmngs0C3f1ScR0Zc3krlyITICvpUWCKf5WNTBBwDP698Rlmg=='
        };

        // Send the payment request to Safaricom API
        const paymentResponse = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            paymentData,
            { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        // Save payment initiation details into the database
        const query = `INSERT INTO payments_table (UserID, PaymentDate, Amount, PaymentType, TransactionID) 
                       VALUES (?, NOW(), ?, ?, ?)`;
        const transactionID = paymentResponse.data.CheckoutRequestID;

        db.query(query, [userId, amount, paymentType, transactionID], (err) => {
            if (err) {
                console.error('Database error:', err.message);
                return res.status(500).json({ error: 'Failed to record payment in the database' });
            }
            res.status(200).json({
                message: 'Payment initiated successfully.',
                transactionID,
            });
        });
    } catch (err) {
        console.error('Error initiating payment:', err.response?.data || err.message); // Logs Safaricom's response or the error message
        res.status(500).json({ error: err.response?.data || err.message });
    }
    
};

module.exports = { initiatePayment };
