require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/connect');
const Category = require('./models/categoryModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');

const categories = [
        {
            name: 'kids',
            description: 'Clothing for kids'
        },
        {
            name: 'women',
            description: 'Clothing for women'
        },
        {
            name: 'men',
            description: 'Clothing for men'
        }
    ];
const kids = categories.find(c => c.name === 'kids');
const women = categories.find(c => c.name === 'women'); 
const men = categories.find(c => c.name === 'men');
const products = [
    {
        name: 'Dino T-shirt',
        price: 100,
        stock: 52,
        inStock: true,
        category: kids._id
    },
    {
        name: 'Thong Pants',
        price: 240,
        stock: 13,
        inStock: true,
        category: women._id
    },
    {
        name: 'Teal Blazer',
        price: 310,
        stock: 19,
        inStock: true,
        category: men._id
    }];
const seed = async ()=>{
    await connectDB();
    await Product.deleteMany();
    await Category.deleteMany();
    await Category.insertMany(categories);
    await Product.insertMany(products);
    await mongoose.disconnect();
    process.exit(0);
}

seed();