import express from 'express';
import Customer from '../models/Customer.js';

const router = express.Router();

// GET ALL CUSTOMERS
router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find().sort({ createdAt: -1 });
        res.json(customers);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// ✅ NEW: GET A SINGLE CUSTOMER BY ID
router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });
        res.json(customer);
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// CREATE A CUSTOMER
router.post('/', async (req, res) => {
    // ✅ MODIFIED: Now accepts nextServiceDueDate from the form
    const { name, phone, address, installationDate, nextServiceDueDate } = req.body;
    try {
        const newCustomer = new Customer({
            name,
            phone,
            address,
            installationDate,
            nextServiceDueDate // Manually set date
        });
        const customer = await newCustomer.save();
        res.status(201).json(customer);
    } catch (err) {
        res.status(400).json({ message: 'Error creating customer', error: err });
    }
});

// ADD A SERVICE RECORD
router.post('/:id/services', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).json({ message: 'Customer not found' });

        // ✅ MODIFIED: Now accepts nextServiceDueDate from the form
        const { serviceDate, workDone, technician, nextServiceDueDate } = req.body;
        
        customer.serviceHistory.push({ serviceDate, workDone, technician });
        customer.lastServiceDate = serviceDate;
        customer.nextServiceDueDate = nextServiceDueDate; // Manually update the date

        const updatedCustomer = await customer.save();
        res.json(updatedCustomer);
    } catch (err) {
        res.status(400).json({ message: 'Error adding service', error: err });
    }
});

export default router;