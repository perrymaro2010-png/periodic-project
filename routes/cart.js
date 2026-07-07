const express = require('express');
const router = express.Router();
const {
    addProduct,
    getCart,
    removeProductEntirely,
    updateProductQuantity,
    clearCart
} = require('../controllers/cartController');

router.get('/:id', getCart);
router.post('/:id/product', addProduct);
router.delete('/:id/product', removeProductEntirely);
router.patch('/:id/product', updateProductQuantity);
router.put('/:id/products', clearCart);

module.exports = router;