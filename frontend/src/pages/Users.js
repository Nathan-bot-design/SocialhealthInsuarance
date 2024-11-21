import React from 'react';
import { Link } from 'react-router-dom';
import image from '../assets/image.jpg';  // This goes one level up from pages and accesses assets

const Users = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Social Health Insurance System</h1>
                <p style={styles.introText}>
                    Your health, our priority. Peace of mind for you and your family starts here.
                </p>
            </header>

            <div style={styles.heroSection}>
                <img
                    src={image}  // Use the uploaded image path here
                    alt="Happy family benefiting from health insurance"
                    style={styles.heroImage}
                />
            </div>

            <section style={styles.benefitsSection}>
                <h2 style={styles.subtitle}>How Social Health Insurance Benefits You</h2>
                <ul style={styles.benefitsList}>
                    <li style={styles.benefitItem}>
                        <strong>Emergency Care Coverage</strong>: No more worrying about medical bills in emergencies.
                    </li>
                    <li style={styles.benefitItem}>
                        <strong>Comprehensive Disease Treatment</strong>: From routine checkups to critical disease treatments, we’ve got you covered.
                    </li>
                    <li style={styles.benefitItem}>
                        <strong>Affordable Premiums</strong>: Get the best care without breaking the bank.
                    </li>
                    <li style={styles.benefitItem}>
                        <strong>Worldwide Access</strong>: Wherever you are, your health insurance travels with you.
                    </li>
                </ul>
            </section>

            <section style={styles.callToAction}>
                <h2 style={styles.subtitle}>Take Control of Your Health Today!</h2>
                <p style={styles.actionText}>Are you a new user? Sign up now and start benefiting from our services.</p>

                <div style={styles.buttons}>
                    <Link to="/register">
                        <button style={styles.button}>Register</button>
                    </Link>
                    <Link to="/login">
                        <button style={styles.secondaryButton}>Login</button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

const styles = {
    container: {
        fontFamily: "'Roboto', sans-serif",
        lineHeight: '1.6',
        color: '#333',
        backgroundColor: '#f9f9f9',
        padding: '20px',
    },
    header: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    title: {
        fontSize: '2.5rem',
        color: '#1a202c',
        fontWeight: 'bold',
    },
    introText: {
        fontSize: '1.2rem',
        color: '#718096',
    },
    heroSection: {
        textAlign: 'center',
        marginBottom: '40px',
    },
    heroImage: {
        maxWidth: '100%',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    benefitsSection: {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px',
    },
    subtitle: {
        fontSize: '1.8rem',
        color: '#2b6cb0',
        fontWeight: 'bold',
        marginBottom: '20px',
        textAlign: 'center',
    },
    benefitsList: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
    },
    benefitItem: {
        fontSize: '1.2rem',
        marginBottom: '15px',
        color: '#4a5568',
    },
    callToAction: {
        backgroundColor: '#edf7ed',
        padding: '40px',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    },
    actionText: {
        fontSize: '1.2rem',
        color: '#4a5568',
        marginBottom: '20px',
    },
    buttons: {
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
    },
    button: {
        backgroundColor: '#38a169',
        color: '#fff',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
    },
    secondaryButton: {
        backgroundColor: '#3182ce',
        color: '#fff',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1rem',
        cursor: 'pointer',
        borderRadius: '8px',
        transition: 'background-color 0.3s ease',
    },
};

export default Users;
