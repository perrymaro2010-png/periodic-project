const { asyncHandler, ok } = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Product = require("../models/productModel");

//POST - create new product
const createProduct = asyncHandler(async (req, res) => {
  //checking that all fields are present
  const { name, description, price, stock, category } = req.body;
  const fields = ["name", "description", "price", "stock"];
  for (field of fields) {
    if (req.body[field] === undefined)
      throw new AppError("All fields are required", 400);
  }
  // if the only missing thing is category
  if (!category) throw new AppError("Category Not Found", 404);
  //check if the product already exists
  const existingProduct = await Product.findOne({
    name: name,
  });
  if (existingProduct) throw new AppError("Product Already Exists", 409);
  //create product
  const product = await Product.create({
    name,
    description,
    price,
    stock,
    category,
  });
  //200 OK response
  ok(res, product, "Product created successfully.", 201);
});

//PATCH + PUT - update details of an existing product
const updateProduct = asyncHandler(async (req, res) => {
  //get product id
  const id = req.params.id;
  //find and update
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  //error-handling: if product is nonexistent
  if (!product) throw new AppError("Product Not Found", 404);
  //200 OK response
  ok(res, product, "Product Updated Successfully.");
});

//DELETE - delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  //soft-delete product
  const deleted = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  //check to see if deleted doesn't return null or undefined
  if (!deleted) throw new AppError("Product Not Found", 404);
  //200 OK response
  ok(res, deleted, "Product Deleted Successfully");
});

//GET - get all products, with filtering queries
const getAllProducts = asyncHandler(async (req, res) => {
  //adding all found queries in an object to pass to the find() method
  let filter = {};
  if (req.query.category) {
    filter.category = req.query.category; //check for category
  }
  if (req.query.maxPrice || req.query.minPrice) {
    filter.price = {}; //check for max and min prices
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
  }
  if (req.query.inStock === "true") {
    //check the inStock query
    filter.stock = { $gte: 1 };
  }
  if (req.query.search) {
    //check for keywords in name and description, with case insensitivity
    filter.$or = [
      {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }
  // fetch product with selected details of category (and make sure they are not soft deleted)
  const products = await Product.find({
    ...filter,
    isDeleted: false
  }).populate("category", "name");
  if (!products.length)
    //check for empty array
    throw new AppError("No Products Are Available Yet", 404);
  //200 OK response
  ok(res, products, "Products Fetched Successfully");
});

// fetch product by ID
const getProduct = asyncHandler(async (req, res) => {
  //get product with selected details of category
  const product = await Product.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).populate("category", "name description");
  //error-handle for product's prese
  if (!product) throw new AppError("Product Not Found", 404);
  // 200 OK response
  ok(res, product, "Product Fetched Successfully");
});

// PUT - completely update all details of product
const replaceProduct = asyncHandler(async (req, res) => {
  // check for all fields availability
  const fields = ["name", "description", "price", "stock", "category"];
  for (field of fields) {
    if (req.body[field] === undefined)
      throw new AppError("All fields are required", 400);
  }
  //update available product
  const product = await Product.findOneAndUpdate(
    {
      _id: req.params.id,
      isDeleted: false,
    },
    req.body,
    { new: true, runValidators: true },
  );
  if (!product) throw new AppError("Product Not Found", 404);
  //200 OK response
  ok(res, product, "Product updated successfully");
});
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  replaceProduct,
};
