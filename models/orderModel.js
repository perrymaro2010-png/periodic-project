const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    items:[{
        name:{
            type: String,
            required: true
        },
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
        required:true,
    },
    status:{
        type: String,
        enum: ['pending', 'delivered', 'confirmed', 'cancelled', 'shipped'],
        default: 'pending'
    },
    shippingAddress:{
        street:{type: String, required:true},
        city:{type: String},
        country:{type: String, required: true}
    },
    paymentMethod:{
        type:String,
        enum: ['CASH','CARD'],
        default: 'CASH'
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;