const express = require('express');
const router = express.Router();
const {
    createCategory, 
    updateCategory, 
    deleteCategory, 
    getAllCategories, 
    getCategory
} = require('../controllers/categoryController');

router.get('/', getAllCategories);
router.get('/:id', getCategory);
router.post('/', createCategory);
router.patch('/:id', updateCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;