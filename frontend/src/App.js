import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Payments from './pages/Payments';
import Claims from './pages/Claims'; // Ensure you import the Claims component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/claims" element={<Claims />} /> {/* Corrected line */}
            </Routes>
        </Router>
    );
}

export default App;
