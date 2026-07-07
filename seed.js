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

const seed = async ()=>{
    
    try {
        await connectDB();
        await Product.deleteMany({});
        await Category.deleteMany({});
        const insertCategories = await Category.insertMany(categories);

        const kids = insertCategories.find(c => c.name === 'kids');
        const women = insertCategories.find(c => c.name === 'women');
        const men = insertCategories.find(c => c.name === 'men');

        const products = [
            {
                name: 'Dino T-shirt',
                price: 100,
                stock: 52,
                inStock: true,
                category: kids[0]._id
            },
            {
                name: 'Thong Pants',
                price: 240,
                stock: 13,
                inStock: true,
                category: women[0]._id
            },
            {
                name: 'Teal Blazer',
                price: 310,
                stock: 19,
                inStock: true,
                category: men[0]._id
            }];

        await Product.insertMany(products);
        await Category.insertMany(categories);
        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        await mongoose.disconnect();
        process.exit(1);
    }
};

seed();