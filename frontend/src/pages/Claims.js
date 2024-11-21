import React, { useEffect, useState } from 'react';

const Claims = () => {
    const [claims, setClaims] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/claims');
                const data = await response.json();
                setClaims(data);
            } catch (err) {
                console.error('Error fetching claims:', err);
            }
        };

        fetchClaims();
    }, []);

    const handleFileUpload = async (claimId) => {
        const formData = new FormData();
        formData.append('document', selectedFile);

        try {
            const response = await fetch(`http://localhost:5000/api/claims/${claimId}/documents`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            alert(data.message);
        } catch (err) {
            console.error('Error uploading document:', err);
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Manage Your Claims</h1>
            <button style={styles.addButton} onClick={() => alert('Claim submission coming soon!')}>
                Submit a New Claim
            </button>
            <div style={styles.claimsContainer}>
                {claims.length === 0 ? (
                    <p>No claims found. Submit a new claim to get started.</p>
                ) : (
                    claims.map((claim) => (
                        <div key={claim.ClaimID} style={styles.claimCard}>
                            <h3>Claim ID: {claim.ClaimID}</h3>
                            <p>Status: {claim.Status}</p>
                            <p>Description: {claim.Description}</p>
                            <input
                                type="file"
                                onChange={(e) => setSelectedFile(e.target.files[0])}
                            />
                            <button
                                style={styles.uploadButton}
                                onClick={() => handleFileUpload(claim.ClaimID)}
                            >
                                Upload Document
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '20px', textAlign: 'center' },
    heading: { color: '#333', fontSize: '2em' },
    addButton: {
        backgroundColor: '#007bff',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '5px',
        marginBottom: '20px',
        border: 'none',
    },
    claimsContainer: { marginTop: '20px' },
    claimCard: {
        backgroundColor: '#f4f4f4',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '10px',
    },
    uploadButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '5px 10px',
        borderRadius: '5px',
        marginTop: '10px',
    },
};

export default Claims;
