import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        installationDate: new Date().toISOString().slice(0, 10),
        nextServiceDueDate: '', // ✅ NEW: State for the manual date
    });
    const navigate = useNavigate();

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://customer-maintain.onrender.com/api/customers', formData);
            navigate('/');
        } catch (err) {
            console.error('Failed to add customer', err);
        }
    };

    return (
        <div className="form-container">
            <h2>Add New Customer</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Customer Name</label>
                    <input type="text" name="name" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Installation Date</label>
                    <input type="date" name="installationDate" value={formData.installationDate} onChange={onChange} required />
                </div>
                {/* ✅ NEW: Form field for Next Service Due Date */}
                <div className="form-group">
                    <label>Next Service Due Date</label>
                    <input type="date" name="nextServiceDueDate" value={formData.nextServiceDueDate} onChange={onChange} required />
                </div>
                <button type="submit" className="btn">Save Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;
