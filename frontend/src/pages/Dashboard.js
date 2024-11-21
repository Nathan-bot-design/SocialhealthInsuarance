import React from 'react';
import { Link } from 'react-router-dom';
import { FaClipboardList, FaMoneyCheckAlt, FaCogs } from 'react-icons/fa'; // Icons for visual enhancement

const Dashboard = () => {
    return (
        <div style={styles.container}>
            <div style={styles.dashboardBox}>
                <h1 style={styles.title}>Welcome to Your Dashboard</h1>
                <p style={styles.introText}>
                    Easily manage your claims, payments, and admin settings all in one place.
                </p>

                <div style={styles.buttonsContainer}>
                    <Link to="/claims" style={styles.link}>
                        <div style={styles.button}>
                            <FaClipboardList style={styles.icon} />
                            <span>Manage Claims</span>
                        </div>
                    </Link>
                    <Link to="/payments" style={styles.link}>
                        <div style={styles.button}>
                            <FaMoneyCheckAlt style={styles.icon} />
                            <span>Manage Payments</span>
                        </div>
                    </Link>
                    <Link to="/admin" style={styles.link}>
                        <div style={styles.button}>
                            <FaCogs style={styles.icon} />
                            <span>Admin Panel</span>
                        </div>
                    </Link>
                </div>
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
        backgroundColor: '#f0f4f8',
        padding: '20px',
    },
    dashboardBox: {
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)',
        padding: '40px',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5rem',
        color: '#1a202c',
        marginBottom: '20px',
        fontWeight: 'bold',
    },
    introText: {
        fontSize: '1.2rem',
        color: '#4a5568',
        marginBottom: '40px',
        lineHeight: '1.6',
    },
    buttonsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        backgroundColor: '#3182ce',
        color: '#ffffff',
        padding: '15px 20px',
        borderRadius: '8px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    link: {
        textDecoration: 'none',
        width: '100%',
    },
    buttonHover: {
        backgroundColor: '#2b6cb0',
    },
    icon: {
        fontSize: '1.5rem',
    },
};

export default Dashboard;
