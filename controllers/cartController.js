const {asyncHandler, ok} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

const addProduct = asyncHandler(async(req, res)=>{
    const userID = req.params.id;
    let cart = await Cart.findOne({user: userID});
    if(!cart) cart = await Cart.create({
        user: userID,
        items: [],
        totalPrice: 0
    });
    const {product, quantity} = req.body;
    if(quantity < 1) throw new AppError('Invalid Quantity', 400);
    const productDoc = await Product.findOne({
        _id: product,
        isDeleted: false
    });
    if(!productDoc) throw new AppError('Product Not Found', 404);
    const existingItem = cart.items.find(item =>
        item.product.equals(product)
    );
    if(existingItem) {
        if(existingItem.quantity + quantity > productDoc.stock){
            throw new AppError('Not Enough Items in Stock', 400);
        }
        quantity += existingItem.quantity;
    } else {
        if(quantity > productDoc.stock)
            throw new AppError('Not Enough Items in Stock', 400);
        cart.items.push({
        product,
        quantity
    });
    }
    cart.totalPrice += productDoc.price * quantity;
    await cart.save();
    ok(res, cart, 'Product Added Successfully');
});

const getCart = asyncHandler(async (req, res)=>{
    const userID = req.params.id;
    let cart = await Cart.findOne({user: userID});
    if(!cart) cart = await Cart.create({
        user: userID,
        items: [],
        totalPrice: 0
    });
    await cart.populate('items.product');
    ok(res, cart, 'Cart Fetched Successfully');
});

const removeProductEntirely = asyncHandler(async (req, res)=>{
    const userID = req.params.id;
    const {product} = req.body;
    let cart = await Cart.findOne({user: userID});
    if(!cart){
        throw new AppError('Nothing to Remove', 404);
    }
    const productDoc = cart.items.find((item)=> item.product.equals(product));
    if(!productDoc) throw new AppError('Product Not Found', 404);
    const actualProduct = await Product.findOne({
        _id: productDoc.product,
        isDeleted: false
    });
    if(!actualProduct) throw new AppError('Product Not Found', 404);
    cart.totalPrice -= actualProduct.price * productDoc.quantity;
    cart.items = cart.items.filter(
        item => !item.product.equals(product)
    );
    await cart.save();
    ok(res, cart, 'Product Removed Successfully');
});

const updateProductQuantity = asyncHandler(async (req, res)=>{
    const userID = req.params.id;
    const {product, quantity} = req.body;
    let cart = await Cart.findOne({user: userID});
    if(!cart){
        throw new AppError('Nothing to Update', 404);
    }
    let productDoc = cart.items.find((b)=> b.product.equals(product));
    if(!productDoc) throw new AppError('Product Not Found', 404);

    const updatedQuantity = productDoc.quantity + quantity;
    if(updatedQuantity < 1) throw new AppError('Invalid quantity', 400);
    
    const actualProduct = await Product.findById(productDoc.product);
    if (!actualProduct || actualProduct.isDeleted) {
        throw new AppError('Product Not Found', 404);
    }
    if (updatedQuantity > actualProduct.stock) {
        throw new AppError('Not enough stock available', 400);
    }

    productDoc.quantity = updatedQuantity;
    cart.totalPrice = 0;

    for (const item of cart.items) {
        const product = await Product.findById(item.product);
        if (!product || product.isDeleted) continue;
        cart.totalPrice += product.price * item.quantity;
    }
    await cart.save();
    ok(res, cart, 'Product Quantity Updated Successfully');
});

const clearCart = asyncHandler(async(req, res)=>{
    const userID = req.params.id;
    let cart = await Cart.findOne({user: userID});
    if(!cart){
        throw new AppError('Nothing to Clear', 404);
    };
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
    ok(res, cart, 'Cart Cleared Successfully');

});

module.exports = {
    addProduct,
    getCart,
    removeProductEntirely,
    updateProductQuantity,
    clearCart
};