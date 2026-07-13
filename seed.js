require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db/connect");
const Category = require("./models/categoryModel");
const Product = require("./models/productModel");
const Cart = require("./models/cartModel");
const Order = require("./models/orderModel");

const categories = [
  {
    name: "kids",
    description: "Clothing for kids",
  },
  {
    name: "women",
    description: "Clothing for women",
  },
  {
    name: "men",
    description: "Clothing for men",
  },
];

const seed = async () => {
  let code;
  try {
    await connectDB();
    await Order.deleteMany({});
    await Cart.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});
    const createdCategories = await Category.insertMany(categories);

    const kids = createdCategories.find((c) => c.name === "kids");
    const women = createdCategories.find((c) => c.name === "women");
    const men = createdCategories.find((c) => c.name === "men");

    const products = [
      {
        name: "Dino T-shirt",
        description:
          "Green and Orange Dino pattern with grey a baby blue background",
        price: 100,
        stock: 52,
        category: kids._id,
      },
      {
        name: "Wide-Leg Pants",
        description:
          "Black pants slim over the hip and widens around the knees and below",
        price: 240,
        stock: 13,
        category: women._id,
      },
      {
        name: "Teal Blazer",
        description: "Teal blazer with brown buttons and a cream interior",
        price: 310,
        stock: 19,
        category: men._id,
      },
      {
        name: "Orange Shorts",
        description: "Trouser-like shorts for ages 5-7 year old boys",
        price: 250,
        stock: 7,
        category: kids._id,
      },
      {
        name: "Ariel T-Shirt",
        description:
          "T-shirt with the Disney Princess printed on the back, suitable for 12 year old girls",
        price: 315,
        stock: 26,
        category: kids._id,
      },
      {
        name: "Pistache Blouse",
        description: "blouse with puffed half-sleeves and olive buttons",
        price: 420,
        stock: 13,
        category: women._id,
      },
      {
        name: "Dark Brown shoes",
        description: "dark brown Clarks shoes sizes range 41-46",
        price: 650,
        stock: 36,
        category: men._id,
      },
    ];
    await Product.insertMany(products);
    console.log(
      `Success! Categories: ${categories.length}, Products: ${products.length}.`,
    );
    code = 0;
  } catch (err) {
    console.error(err.message);
    code = 1;
  } finally {
    await mongoose.disconnect();
    process.exit(code);
  }
};

seed();
