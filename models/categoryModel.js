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
    },
    slug:{
        type: String,
        lowercase: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
});

categorySchema.pre('save', function(next){
    this.slug = this.name
    .toLowerCasae()
    .replace(/\s+/g, "-");
})
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;