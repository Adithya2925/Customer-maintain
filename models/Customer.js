import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    serviceDate: { type: Date, required: true },
    workDone: { type: String, required: true },
    technician: String,
});

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    installationDate: { type: Date, default: Date.now },
    lastServiceDate: Date,
    nextServiceDueDate: Date,
    serviceHistory: [ServiceSchema],
}, { timestamps: true });

export default mongoose.model('Customer', CustomerSchema);