const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Category name is a required field"],
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        required: [true, "Category description is a required field"]
    },
    isDeleted:{
        type: Boolean,
        default: true
    }
});
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;