import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddService = () => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        serviceDate: new Date().toISOString().slice(0, 10),
        workDone: '',
        technician: '',
        nextServiceDueDate: '', 
    });

    const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://customer-maintain.onrender.com/api/customers/${customerId}/services`, formData);
            navigate('/');
        } catch (err) {
            console.error('Failed to add service record', err);
        }
    };

    return (
        <div className="form-container">
            <h2>Add Service Record</h2>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Service Date</label>
                    <input type="date" name="serviceDate" value={formData.serviceDate} onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Work Done</label>
                    <input type="text" name="workDone" placeholder="e.g., Filter changed" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label>Technician Name</label>
                    <input type="text" name="technician" onChange={onChange} />
                </div>
                {/* ✅ NEW: Form field for Next Service Due Date */}
                <div className="form-group">
                    <label>Next Service Due Date</label>
                    <input type="date" name="nextServiceDueDate" value={formData.nextServiceDueDate} onChange={onChange} required />
                </div>
                <button type="submit" className="btn">Add Service Record</button>
            </form>
        </div>
    );
};

export default AddService;
