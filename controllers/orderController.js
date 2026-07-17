const {asyncHandler, ok} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Product = require('../models/productModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel')

const createOrder = asyncHandler(async(req, res)=> {
    // get user ID
    const userID = req.body.id;
    // get cart by user ID
    const cart = await Cart.findOne({user: userID});
    // error-handling: absence of cart
    if(!cart || cart.items.length === 0){
        throw new AppError('Cart Not Found/is Empty', 404);
    }
    const orderedItems = []; //all valid items in cart.items
    const products = []; // all original products found in cart.items
    //per each item in cart:
    let totalPrice = 0;
    for (const item of cart.items){
        //get original product of product referenced in cart
        let product = await Product.findOne({
            _id: item.product,
            isDeleted: false
        });
        //error-handling: absence of product, insufficient stock
        if(!product) throw new AppError('Product Not Found', 404);
        if(item.quantity > product.stock) throw new AppError(`${product.name} only has ${product.stock} left in stock`, 400);
        //add valid products into the array (products, orderedItems)
        products.push(product);
        orderedItems.push({
            name: product.name,
            product: product._id,
            quantity: item.quantity,
            price: product.price
        });
        totalPrice += product.price * item.quantity;
    };
         //decrease stock value prior checkout
        for(let i = 0; i < products.length; i++){
            products[i].stock -= cart.items[i].quantity;
            await products[i].save();
        }

    //create order
    const orderNumber = `ORD-${Date.now()}`;
    const order = await Order.create({
        orderNumber: orderNumber,
        items: orderedItems,
        totalPrice: totalPrice,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod
    });

    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    ok(res, order, 'Order Created Successfully');
});

//get past orders
const getPastOrders = asyncHandler(async(req, res)=>{
    //get previous orders
    const pastOrders = await Order.find();
    //error-handling: absence of past orders
    if(pastOrders.length === 0) throw new AppError('No Previous Orders', 404);
    ok(res, pastOrders, 'Past Orders Fetched Successfully');
});

//get specific order by orderID
const getSpecificOrder = asyncHandler(async(req, res)=>{
    //get userID AND orderID
    const orderID = req.params.id;
    //get order by id
    const order = await Order.findOne({
        orderNumber: orderID,
    });
    //error-handling: absence of order
    if(!order) throw new AppError('Order Not Found', 404);
    ok(res, order, 'Order Fetched Successfully');
});

const updateStatus = asyncHandler(async(req, res)=>{
    const orderID = req.params.id;
    const order = await Order.findOne({
        orderNumber: orderID
    });
    if(!order) throw new AppError('Order Not Found', 404);
    order.status = req.body.status;
    await order.save();
    ok(res, order, "Order Status Updated Successfully");
});

module.exports = {
    createOrder,
    getPastOrders,
    getSpecificOrder,
    updateStatus
}