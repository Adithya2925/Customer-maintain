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
    const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
        try {
            await axios.delete(`http://localhost:5001/api/customers/${id}/delete-customer`);
            // Refresh the list after delete
            setCustomers(customers.filter(customer => customer._id !== id));
        } catch (err) {
            console.error('Error deleting customer!', err);
        }   
    }
};


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
                                <button
                                onClick={() => handleDelete(customer._id)}
                                className="action-link"
                                 style={{ color: 'red', cursor: 'pointer', background: 'none', border: 'none' }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Dashboard;