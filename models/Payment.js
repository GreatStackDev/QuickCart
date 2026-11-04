import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    reference: {
        type: String,
        required: true,
        unique: true
    },

    userId: {
        type: String,
        required: true,
        ref: 'User'
    },

    items: [
        {
            product: {
                type: String,
                required: true,
                ref: 'Product'
            },

            size: { type: String, default: '' },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    amountPesewas: { type: Number },
    currency: { type: String, default: 'GHS' },
    email: { type: String },
    orderId: { type: String },

    amount: {
        type: Number,
        required: true
    },

    address: {
        type: String,
        required: true,
        ref: 'Address'
    },

    status: {
        type: String,
        required: true,
        default: 'pending'
    },

    date: {
        type: Number,
        required: true
    }
});

const Payment =
    mongoose.models.Payment ||
    mongoose.model('Payment', PaymentSchema);

export default Payment;