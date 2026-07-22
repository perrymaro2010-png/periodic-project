const {body, param, validationResult} = require('express-validator');
const AppError = require('../../utils/AppError');

const validateProduct = [
    body('name')
    .notEmpty()
    .withMessage('Name is a required field.')
    .isString()
    .trim()
    .withMessage('Name must be a string.'),

    body('description')
    .notEmpty()
    .withMessage('Description is a required field.')
    .isString()
    .withMessage('Must be a string')
    .trim()
    .isLength({min: 5})
    .withMessage('Must be a string with a length more than at least 5 characters.'),

    body('price')
    .notEmpty()
    .withMessage('Price is a required field.')
    .isFloat({min: 90})
    .withMessage('Price must be a float more than 90EGP')
    .toFloat(),

    body('stock')
    .notEmpty()
    .withMessage('Stock is a required field.')
    .isInt({min: 0})
    .withMessage('Stock value must be at least 0'),

    body('category')
    .isMongoId()
    .withMessage('Invalid ObjectID'),

];

const validateToUpdate = [
    body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .trim(),

    body('description')
    .optional()
    .isString()
    .withMessage('Must be a string')
    .isLength({min: 5})
    .withMessage('Must be a string with at least 5 characters.')
    .trim(),

    body('price')
    .optional()
    .isFloat({min: 90})
    .withMessage('Product Price must exceed 90EGP')
    .toFloat(),

    body('stock')
    .optional()
    .isInt({min: 0})
    .withMessage('Stock value must be at least 0'),

    body('category')
    .optional()
    .isMongoId()
    .withMessage('Category must be an Object ID'),

]

const validateID = [
    param('id')
    .isMongoId()
    .withMessage('Invalid Object ID')
];

const validator = (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const message = errors.array().map((e)=> e.msg).join(', ');
        return next(new AppError(message, 400))
    }
    next();
}

module.exports = {
    validateProduct,
    validateToUpdate,
    validateID,
    validator
}