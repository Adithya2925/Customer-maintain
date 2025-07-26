import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddCustomer from './pages/AddCustomer';
import AddService from './pages/AddService';
import CustomerDetails from './pages/CustomerDetails'; // ✅ NEW: Import the details page
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <header className="header">
                    <h1>RO Service Management</h1>
                </header>
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/add-customer" element={<AddCustomer />} />
                        <Route path="/add-service/:customerId" element={<AddService />} />
                        <Route path="/customer/:customerId" element={<CustomerDetails />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;