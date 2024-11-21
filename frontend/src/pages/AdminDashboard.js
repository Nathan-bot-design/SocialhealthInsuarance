import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({});
    const [reportType, setReportType] = useState('claims');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/admin/dashboard')
            .then((res) => res.json())
            .then((data) => setDashboardData(data))
            .catch((err) => console.error(err));
    }, []);

    const fetchReport = () => {
        fetch(
            `http://localhost:5000/api/admin/reports?reportType=${reportType}&startDate=${startDate}&endDate=${endDate}`
        )
            .then((res) => res.json())
            .then((data) => setReportData(data))
            .catch((err) => console.error(err));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Admin Dashboard</h1>
            <div>
                <h2>Overview</h2>
                <p>Users Registered: {dashboardData.userCount?.userCount}</p>
                <p>Pending Claims: {dashboardData.claimsCount?.claimsCount}</p>
                <p>Total Payments: {dashboardData.paymentsTotal?.totalPayments}</p>
            </div>
            <div>
                <h2>Generate Report</h2>
                <label>
                    Report Type:
                    <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
                        <option value="claims">Claims</option>
                        <option value="payments">Payments</option>
                        <option value="users">Users</option>
                    </select>
                </label>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </label>
                <button onClick={fetchReport}>Generate Report</button>
                {reportData.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                {Object.keys(reportData[0]).map((key) => (
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {reportData.map((row, index) => (
                                <tr key={index}>
                                    {Object.values(row).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
