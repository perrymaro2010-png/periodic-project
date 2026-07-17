const { asyncHandler, ok } = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

// POST - add new product to (existent?) cart
const addProduct = asyncHandler(async (req, res) => {
  //get user id from req.body
  const userID = req.body.id;
  //find their cart, or create one if there isn't 
  let cart = await Cart.findOne({ user: userID });
  if (!cart)
    cart = await Cart.create({
      user: userID,
      items: [],
      totalPrice: 0,
    });
  //get product and quantity values 
  const { product, quantity } = req.body;
  //error-handling invalid additive quantity
  if (quantity < 1) throw new AppError("Invalid Quantity", 400);
  //find original product document + error-handle its absence
  const productDoc = await Product.findOne({
    _id: product,
    isDeleted: false,
  });
  if (!productDoc) throw new AppError("Product Not Found", 404);
  //used to validate products existence and its validity to be added
  const existingItem = cart.items.find((item) => item.product.equals(product));
  if (existingItem) {
    // check valid quantity (for if the product has already been added)
    if (existingItem.quantity + quantity > productDoc.stock) {
      throw new AppError("Not Enough Items in Stock", 400);
    }
    existingItem.quantity += quantity;
  } else {
    // if this is added now, check stock validity as well
    if (quantity > productDoc.stock)
      throw new AppError("Not Enough Items in Stock", 400);
    //push all items into cart.items 
    cart.items.push({
      product,
      quantity,
      price: productDoc.price,
    });
  }
  //recalculate totalPrice
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  // save and 200 OK Response
  await cart.save();
  ok(res, cart, "Product Added Successfully");
});

//GET - fetch cart
const getCart = asyncHandler(async (req, res) => {
  //get userID from req.body + error-handle its absence
  const userID = req.body.id;
  let cart = await Cart.findOne({ user: userID });
  if (!cart)
    cart = await Cart.create({
      user: userID,
      items: [],
      totalPrice: 0,
    });
    //display all the items using populate + 200 OK Response
  await cart.populate("items.product");
  ok(res, cart, "Cart Fetched Successfully");
});

// DELETE - remove it entirely from cart
const removeProductEntirely = asyncHandler(async (req, res) => {
  //get userID and product + fetch cart/error-handle absence
  const userID = req.body.id;
  const product = req.body.product;
  let cart = await Cart.findOne({ user: userID });
  if (!cart) {
    throw new AppError("Nothing to Remove", 404);
  }
  //put all items in cart in an array + error-handle empty cart
  //check for item's actual existence as a product
  const cartItem = cart.items.find((item) => item.product.equals(product));
  if (!cartItem) throw new AppError("Product Not Found", 404);
  // updating the cart.items to all the things that do not include cartItem
  cart.items = cart.items.filter((item) => !item.product.equals(product));
  //recalculate total price
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  //save and 200 OK Response
  await cart.save();
  ok(res, cart, "Product Removed Successfully");
});

//PATCH
const updateProductQuantity = asyncHandler(async (req, res) => {
  //get userID, product, and quantity from req.body
  const userID = req.body.id;
  const { product, quantity } = req.body;
  //fetch cart and throw error when absent
  let cart = await Cart.findOne({ user: userID });
  if (!cart) {
    throw new AppError("Nothing to Update", 404);
  }
  //get Product from the cart.items
  let productDoc = cart.items.find((b) => b.product.equals(product));
  if (!productDoc) throw new AppError("Product Not Found", 404);
  //update quantity
  const updatedQuantity = productDoc.quantity + quantity;
  //find the original product doc to update its stock later
  const actualProduct = await Product.findById(productDoc.product);
  //remove item if the updated quantity is less than one
  if (updatedQuantity < 1) {
    cart.items = cart.items.filter((item) => !item.product.equals(product));
  } else {
    productDoc.quantity = updatedQuantity;
  }
  //make sure the product exists
  if (!actualProduct || actualProduct.isDeleted) {
    throw new AppError("Product Not Found", 404);
  }
  //validate updateQuantity according to stock
  if (updatedQuantity > actualProduct.stock) {
    throw new AppError("Not enough stock available", 400);
  }

  //recalculate total price
  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  //save + 200 OK Response
  await cart.save();
  ok(res, cart, "Product Quantity Updated Successfully");
});

// DELETE - clear cart from all items
const clearCart = asyncHandler(async (req, res) => {
  //check for userID and cart
  const userID = req.body.id;
  let cart = await Cart.findOne({ user: userID });
  if (!cart) {
    throw new AppError("Nothing to Clear", 404);
  }
  //clear items and total Price
  cart.items = [];
  cart.totalPrice = 0;
  //save + OK
  await cart.save();
  ok(res, cart, "Cart Cleared Successfully");
});

//exports
module.exports = {
  addProduct,
  getCart,
  removeProductEntirely,
  updateProductQuantity,
  clearCart,
};
