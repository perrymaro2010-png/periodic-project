const {body, param, validationResult} = require('express-validator');
const AppError = require('../../utils/AppError');

const validateAddedProduct = [
    body('id')
    .notEmpty()
    .withMessage('Id is required')
    .isMongoId()
    .withMessage('Invalid Object ID'),

    body('product')
    .notEmpty()
    .withMessage('Product Id is required')
    .isMongoId()
    .withMessage('Invalid Object ID'),

    body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({min: 1})
    .withMessage('Quantity must be a number more than 1')

];

const validateToUpdateQuantity = [
    body('id')
    .notEmpty()
    .withMessage('Id is required')
    .isMongoId()
    .withMessage('Invalid user ID'),

    body('product')
    .notEmpty()
    .withMessage('Product is required')
    .isMongoId()
    .withMessage('Invalid product ID'),

    body('quantity')
    .notEmpty()
    .withMessage('Quantity is a required field')
    .isInt()
    .withMessage('Quantity should be a number')
    .custom((value)=> value !== 0)
    .withMessage('Must be a non-zero integer')
]

const validateID = [
    param('productID')
    .notEmpty()
    .withMessage('')
    .isMongoId()
    .withMessage('Invalid Object ID')
]

const validator = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const message = errors.array().map((e)=> e.msg).join(', ');
        return next(new AppError(message, 400))
    }
    next();
}

module.exports = {
    validateAddedProduct,
    validateToUpdateQuantity,
    validateID,
    validator
}