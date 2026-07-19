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
const {
    validateProduct,
    validateToUpdate,
    validateID,
    validator
} = require('../middleware/validators/productValidator');

router.get('/', getAllProducts);
router.get('/:id', validateID, validator, getProduct);
router.post('/', validateProduct, validator, createProduct);
router.patch('/:id', validateID, validateToUpdate, validator, updateProduct);
router.put('/:id', validateID, validateProduct, validator, replaceProduct);
router.delete('/:id', validateID, validator, deleteProduct);

module.exports = router;