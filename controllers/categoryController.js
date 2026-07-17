const { asyncHandler, ok } = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const Category = require("../models/categoryModel");

// POST - create new category
const createCategory = asyncHandler(async (req, res) => {
  // store data from req.body + error-handling their absence
  const { name, description } = req.body;
  if(!name || !description){}
  //check to see if this category already exists
  const existingCategory = await Category.findOne({
    name: name,
  });
  if (existingCategory) throw new AppError("Category Already Exists", 409);
  //if it doesn't exist, let's create it!
  const category = await Category.create({
    name,
    description,
  });
  //201 Created Response
  ok(res, category, "Category created successfully.", 201);
});

//PATCH/PUT - update category details
const updateCategory = asyncHandler(async (req, res) => {
  //get category id
  const id = req.params.id;
  //update slug if category name is updated
  if(req.body.name){
    req.body.slug = req.body.name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
  }
  //push update + error-handling its absence
  const category = await Category.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!category) throw new AppError("Category Not Found", 404);
  // 200 OK Response
  ok(res, category, "Category Updated Successfully");
});

// DELETE - remove it from existence (no soft-delete like Products)
const deleteCategory = asyncHandler(async (req, res) => {
  //get category id
  const id = req.params.id;
  //delete + error-handling inexistent category
  const deleted = await Category.findByIdAndDelete(id);
  if (!deleted) throw new AppError("Category Not Found", 404);
  //200 OK Response
  ok(res, deleted, "Category Deleted Successfully");
});

// GET - get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  //fetch them all + error-handle empty variable
  const categories = await Category.find({});
  if (!categories.length)
    throw new AppError("No Categories Are Available Yet", 404);
  // 200 OK Response
  ok(res, categories, "Categories Fetched Successfully");
});

//GET - specific category
const getCategory = asyncHandler(async (req, res) => {
  //get category + error-handle its absence
  const category = await Category.findById(req.params.id);
  if (!category) throw new AppError("Category Not Found", 404);
  //200 OK Response
  ok(res, category, "Category Fetched Successfully");
});
//export all controllers to use in routes
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
};
