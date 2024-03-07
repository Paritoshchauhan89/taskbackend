import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true       
    },
    lastName: {
        type: String,
        required: true,
        trim: true       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    contactNumber: {
        type: Number,
        required: true,
        unique: true,
        trim: true
    },
    address: {
        type: String,
        // required: true,
        trim: true
    },

}, { timestamps: true });

const conatctModel = mongoose.model('Contact', contactSchema);

export default conatctModel;