const { asyncHandler, ok } = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Product = require("../models/productModel");

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, stock, category } = req.body;
  if (!category) throw new AppError("Category Not Found", 404);
  const existingProduct = await Product.findOne({
    name: name,
  });
  if (existingProduct) throw new AppError("Product Already Exists", 409);
  const product = await Product.create({
    name,
    price,
    stock,
    category,
  });
  ok(res, product, "Product created successfully.", 201);
});

const updateProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) throw new AppError("Product Not Found", 404);
  ok(res, product, "Product Updated Successfully.");
});

const deleteProduct = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const deleted = await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true, runValidators: true },
  );
  if (!deleted) throw new AppError("Product Not Found", 404);
  ok(res, deleted, "Product Deleted Successfully");
});

const getAllProducts = asyncHandler(async (req, res) => {
  let filter = {};
  if (req.query.category) {
    filter.category = req.query.category;
  }
  if (req.query.maxPrice || req.query.minPrice) {
    filter.price = {};
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
  }
  if (req.query.inStock === "true") {
    filter.stock = { $gte: 1 };
  }
  if (req.query.search) {
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
  const products = await Product.find(filter).populate("category", "name");
  if (!products.length)
    throw new AppError("No Products Are Available Yet", 404);
  ok(res, products, "Products Fetched Successfully");
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req.params.id,
    isDeleted: false,
  }).populate("category", "name description");
  if (!product) throw new AppError("Product Not Found", 404);
  ok(res, product, "Product Fetched Successfully");
});

const replaceProduct = asyncHandler(async (req, res) => {
  const fields = ["name", "price", "stock", "category"];
  for (field of fields) {
    if (req.body[field] === undefined)
      throw new AppError("All fields are required", 400);
  }
  const product = await Product.findOneAndUpdate(
    {
      _id: req.params.id,
      isDeleted: false,
    },
    req.body,
    { new: true, runValidators: true },
  );
  if (!product) throw new AppError("Product Not Found", 404);
});
module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  replaceProduct,
};
