import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const CustomerDetails = () => {
    const [customer, setCustomer] = useState(null);
    const { customerId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5001/api/customers/${customerId}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.error("Error fetching customer details!", err));
    }, [customerId]);

    if (!customer) {
        return <div>Loading customer details...</div>;
    }

    return (
        <div>
            <div className="detail-header">
                <h2>{customer.name}</h2>
                <Link to="/" className="btn-secondary">Back to Dashboard</Link>
            </div>

            <div className="customer-info-card">
                <h3>Contact Information</h3>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>Address:</strong> {customer.address}</p>
            </div>

            <div className="customer-info-card">
                <h3>Service Information</h3>
                <p><strong>Installation Date:</strong> {new Date(customer.installationDate).toLocaleDateString()}</p>
                <p><strong>Last Service Date:</strong> {customer.lastServiceDate ? new Date(customer.lastServiceDate).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Next Service Due:</strong> {customer.nextServiceDueDate ? new Date(customer.nextServiceDueDate).toLocaleDateString() : 'N/A'}</p>
            </div>

            <h3>Service History</h3>
            <table className="service-history-table">
                <thead>
                    <tr>
                        <th>Service Date</th>
                        <th>Work Done</th>
                        <th>Technician</th>
                    </tr>
                </thead>
                <tbody>
                    {customer.serviceHistory && customer.serviceHistory.length > 0 ? (
                        customer.serviceHistory.slice().reverse().map((service, index) => (
                            <tr key={index}>
                                <td>{new Date(service.serviceDate).toLocaleDateString()}</td>
                                <td>{service.workDone}</td>
                                <td>{service.technician || 'N/A'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No service history found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerDetails;