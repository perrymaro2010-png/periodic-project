const express = require('express');
const router = express.Router();
const {
    createProduct, 
    updateProduct, 
    deleteProduct, 
    getAllProducts, 
    getProduct,
    replaceProduct
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.put('/:id', replaceProduct);
router.delete('/:id', deleteProduct);

module.exports = router;