import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } catch (err) {
            console.error('Login error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h2 style={styles.title}>Welcome Back!</h2>
                <p style={styles.subtitle}>Please login to access your dashboard</p>

                <form onSubmit={handleLogin} style={styles.form}>
                    <label style={styles.label} htmlFor="email">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                        required
                    />

                    <label style={styles.label} htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                        required
                    />

                    {error && <p style={styles.error}>{error}</p>}

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>

                <p style={styles.footerText}>
                    Don’t have an account? <a href="/register" style={styles.link}>Register here</a>
                </p>
            </div>
        </div>
    );
};

// Styles
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f9f9f9',
    },
    loginBox: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        textAlign: 'center',
    },
    title: {
        fontSize: '1.8rem',
        color: '#2b6cb0',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '1rem',
        color: '#718096',
        marginBottom: '20px',
    },
    form: {
        textAlign: 'left',
    },
    label: {
        fontSize: '0.9rem',
        color: '#4a5568',
        marginBottom: '5px',
        display: 'block',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        border: '1px solid #e2e8f0',
        borderRadius: '4px',
        fontSize: '1rem',
        color: '#2d3748',
        outline: 'none',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#2b6cb0',
        color: '#ffffff',
        border: 'none',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#2c5282',
    },
    error: {
        color: 'red',
        fontSize: '0.9rem',
        marginBottom: '15px',
    },
    footerText: {
        fontSize: '0.9rem',
        color: '#718096',
        marginTop: '15px',
    },
    link: {
        color: '#2b6cb0',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Login;
