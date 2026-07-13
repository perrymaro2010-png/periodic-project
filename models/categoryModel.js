const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is a required field"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

categorySchema.pre("save", function (next) {
  this.slug = this.name.trim().toLowerCase().replace(/\s+/g, "-");
  next();
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
