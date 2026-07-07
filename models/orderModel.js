const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity:{
            type: Number,
            required: true,
            min: 1,
            default: 1
        },
        price:{
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    },
    status:{
        type: String,
        enum: ['pending', 'delivered', 'confirmed', 'cancelled'],
        default: 'pending'
    },
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;