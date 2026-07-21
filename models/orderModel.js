const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: [true, "Order Number is required"],
        unique: true
    },
    items:[{
        name:{
            type: String,
            required: [true, "user name is required"]
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "Products are required"],
        },
        quantity:{
            type: Number,
            required: [true, "Quantity is required"],
            min: 1,
            default: 1
        },
        price:{
            type: Number,
            required: [true, "Price is required"]
        }
    }],
    totalPrice: {
        type: Number,
        required:[true, "Total price is required"],
    },
    status:{
        type: String,
        enum: ['pending', 'delivered', 'confirmed', 'cancelled', 'shipped'],
        default: 'pending'
    },
    shippingAddress:{
        street:{type: String, required:[true, "Street is a required field"]},
        city:{type: String},
        country:{type: String, required: [true, "Country is a required field"]}
    },
    paymentMethod:{
        type:String,
        enum: ['CASH','CARD'],
        default: 'CASH'
    }
}, {timestamps: true});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;