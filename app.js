const config = require('./config/config');
const express = require('express');
const app = express();
const mongoSanitize = require('express-mongo-sanitize');
const cors = require('cors');
const connectDB = require('./db/connect');

const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/category');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());
app.use(express.json()); 
app.use(mongoSanitize());

app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

app.use(errorHandler);

const start = async ()=> {
    try {
        await connectDB();
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (err) {
        console.error(err);
    }
};

start();