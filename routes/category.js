const express = require('express');
const router = express.Router();
const {
    createCategory, 
    updateCategory, 
    replaceCategory,
    deleteCategory, 
    getAllCategories, 
    getCategory
} = require('../controllers/categoryController');
const {
    validateCategory,
    validateToUpdate,
    validateID,
    validator
} = require('../middleware/validators/categoryValidator');

router.get('/', getAllCategories);
router.get('/:id', validateID, validator, getCategory);
router.post('/', validateCategory, validator, createCategory);
router.patch('/:id', validateID, validateToUpdate, validator, updateCategory);
router.put('/:id', validateID, validateCategory, validator, replaceCategory);
router.delete('/:id', validateID, validator, deleteCategory);

module.exports = router;