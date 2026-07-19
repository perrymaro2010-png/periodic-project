const mongoose = require('mongoose');
const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID must be provided"],
        unique: true
    },
    items:[{
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, "Products are required"],
        },
        quantity:{
            type: Number,
            required: [true, "Quantity Field is required."],
            min: 1,
            default: 1
        },
        price:{
            type: Number,
            required: [true, "Price is required"],
            min: 1,
            default: 0
        }
    }],
    totalPrice: {
        type: Number,
        default: 0
    }
}, 
{
    timestamps: true
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;