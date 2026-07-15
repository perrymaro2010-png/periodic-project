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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

categorySchema.pre("save", function () {
  this.slug = this.name.trim().toLowerCase().replace(/\s+/g, "-");
});
const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
