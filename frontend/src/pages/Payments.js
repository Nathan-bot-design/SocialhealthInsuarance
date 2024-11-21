import React, { useState } from 'react';

const Payments = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        amount: '',
        paymentType: 'Monthly',
        userId: 1, // Replace with the actual user ID after authentication
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/payments/pay', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to make payment');
            }

            const result = await response.json();
            alert(result.message || 'Payment successful!');
        } catch (err) {
            console.error('Error:', err.message);
            alert('Something went wrong. Please try again.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h1>Make a Payment</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Amount:</label>
                    <input
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label>Payment Type:</label>
                    <select
                        name="paymentType"
                        value={formData.paymentType}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Annual">Annual</option>
                    </select>
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Pay
                </button>
            </form>
        </div>
    );
};

export default Payments;
