const express = require("express");
const router = express.Router();
const {
  addProduct,
  getCart,
  removeProductEntirely,
  updateProductQuantity,
  clearCart,
} = require("../controllers/cartController");

const {
  validateAddedProduct,
  validateToUpdateQuantity,
  validateID,
  validator
} = require('../middleware/validators/cartValidator');

router.get("/", getCart);
router.post("/items", validateAddedProduct, validator, addProduct);
router.delete("/items/:productID", validateID, validator, removeProductEntirely);
router.patch("/items/:productID", validateID, validateToUpdateQuantity, validator, updateProductQuantity);
router.delete("/items", clearCart);

module.exports = router;
