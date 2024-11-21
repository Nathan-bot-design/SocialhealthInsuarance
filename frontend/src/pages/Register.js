import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';

const UserRegistration = () => {
    const [formData, setFormData] = useState({
        national_id: '',
        name: '',
        email: '',
        phone_number: '',
        password: '',
        date_of_birth: '',
        biometric_data: '',
    });

    const [preview, setPreview] = useState(null);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle image selection and preview
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 10,
                    maxWidthOrHeight: 1024,
                });
                const reader = new FileReader();
                reader.onload = (event) => {
                    setPreview(event.target.result);
                    setFormData((prev) => ({
                        ...prev,
                        biometric_data: event.target.result,
                    }));
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                console.error('Error compressing file:', error);
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (response.ok) {
                alert('User added successfully!');
            } else {
                alert('Error: ' + result.error);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to submit the form.');
        }
    };

    // Updated styles for a more modern, colorful UI
    const styles = {
        container: {
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '12px',
            maxWidth: '600px',
            margin: '50px auto',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        },
        title: {
            textAlign: 'center',
            color: '#2d3748',
            marginBottom: '20px',
            fontSize: '2em',
            fontWeight: '600',
        },
        label: {
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#4a5568',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #cbd5e0',
            fontSize: '16px',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)',
            transition: 'border 0.2s ease-in-out',
        },
        inputFocus: {
            border: '1px solid #3182ce',
        },
        button: {
            width: '100%',
            padding: '12px',
            backgroundColor: '#38a169',
            color: '#ffffff',
            fontSize: '18px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#2f855a',
        },
        preview: {
            display: 'block',
            margin: '10px auto',
            maxWidth: '200px',
            maxHeight: '200px',
            borderRadius: '8px',
            border: '2px solid #cbd5e0',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Register User</h1>
            <form onSubmit={handleSubmit}>
                <label style={styles.label}>
                    National ID:
                    <input
                        style={styles.input}
                        type="text"
                        name="national_id"
                        value={formData.national_id}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Name:
                    <input
                        style={styles.input}
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Email:
                    <input
                        style={styles.input}
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Phone Number:
                    <input
                        style={styles.input}
                        type="text"
                        name="phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Password:
                    <input
                        style={styles.input}
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Date of Birth:
                    <input
                        style={styles.input}
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label style={styles.label}>
                    Biometric Data (Image):
                    <input
                        style={styles.input}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </label>

                {preview && <img src={preview} alt="Preview" style={styles.preview} />}

                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default UserRegistration;
