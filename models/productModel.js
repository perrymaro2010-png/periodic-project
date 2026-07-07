const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        unique: true,
        required: [true, "Product name is a required field"]
    },
    price:{
        type: Number,
        required: [true, "Product price is a required field"],
        min: 0
    },
    stock:{
        type: Number,
        required: [true, "Stock value is a required field"]
    },
    inStock:{
        type: Boolean,
        required: [true, "Stock value is a required field"]
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;