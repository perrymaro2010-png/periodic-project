const express = require("express");
const router = express.Router();
const {
  addProduct,
  getCart,
  removeProductEntirely,
  updateProductQuantity,
  clearCart,
} = require("../controllers/cartController");

router.get("/:id", getCart);
router.post("/items", addProduct);
router.delete("/items", removeProductEntirely);
router.patch("/items/:productID", updateProductQuantity);
router.put("/items/:productID", clearCart);

module.exports = router;
