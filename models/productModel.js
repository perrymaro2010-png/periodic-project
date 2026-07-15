const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is a required field"],
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is a required field"],
      min: [0, "Price cannot have a negative value"],
    },
    stock: {
      type: Number,
      required: [true, "Stock value is a required field"],
      min: [0, "Stock cannot have a negative value"],
      default: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    images: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.virtual("inStock").get(function () {
  return this.stock >= 1;
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
