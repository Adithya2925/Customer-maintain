import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/customers')
            .then(res => setCustomers(res.data))
            .catch(err => console.error('Error fetching customers!', err));
    }, []);

    return (
        <div>
            <div className="dashboard-header">
                <h2>Customer Dashboard</h2>
                <Link to="/add-customer" className="btn">Add New Customer</Link>
            </div>
            <table className="customer-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Next Service Due</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.phone}</td>
                            <td>
                                {customer.nextServiceDueDate
                                    ? new Date(customer.nextServiceDueDate).toLocaleDateString()
                                    : 'N/A'}
                            </td>
                            <td className="action-links">
                                {/* ✅ NEW: "View" link added */}
                                <Link to={`/customer/${customer._id}`} className="action-link">
                                    View
                                </Link>
                                <Link to={`/add-service/${customer._id}`} className="action-link">
                                    Add Service
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;