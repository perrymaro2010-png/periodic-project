const express = require("express");
const router = express.Router();
const {
  addProduct,
  getCart,
  removeProductEntirely,
  updateProductQuantity,
  clearCart,
} = require("../controllers/cartController");

router.get("/", getCart);
router.post("/items", addProduct);
router.delete("/items/:productID", removeProductEntirely);
router.patch("/items/:productID", updateProductQuantity);
router.delete("/items", clearCart);

module.exports = router;
