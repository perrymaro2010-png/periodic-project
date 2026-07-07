const {asyncHandler, ok} = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');
const Category = require('../models/categoryModel');

const createCategory = asyncHandler(async (req, res)=>{
    const {name, description} = req.body;
    const existingCategory = await Category.findOne({
        name: name,
    });
    if (existingCategory) throw new AppError('Category Already Exists', 409);
    const category = await Category.create({
        name, 
        description
    });
    ok(res, category, 'Category created successfully.', 201);
});

const updateCategory = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    const category = await Category.findByIdAndUpdate(id, req.body, {new: true, runValidators: true});
    if (!category) throw new AppError('Category Not Found', 404);
    ok(res, category, 'Category Updated Successfully');
});

const deleteCategory = asyncHandler(async(req, res)=>{
    const id = req.params.id;
    const deleted = await Category.findByIdAndUpdate(id, {isDeleted: true}, {new: true, runValidators: true});
    if(!deleted) throw new AppError('Category Not Found', 404);
    ok(res, deleted, 'Category Deleted Successfully');
});

const getAllCategories = asyncHandler(async(req, res)=>{
    const categories = await Category.find({isDeleted: false});
    if(!categories.length) throw new AppError('No Categories Are Available Yet', 404);
    ok(res, categories, 'Categories Fetched Successfully');
});

const getCategory = asyncHandler(async(req, res)=>{
    const category = await Category.findOne({
        _id: req.params.id,
        isDeleted: false
    });
    if(!category) throw new AppError('Category Not Found', 404);
    ok(res, category, 'Category Fetched Successfully');
});
module.exports = {createCategory, updateCategory, deleteCategory, getAllCategories, getCategory};