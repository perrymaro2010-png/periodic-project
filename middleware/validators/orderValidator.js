const {body, param, validationResult} = require('express-validator');
const AppError = require('../../utils/AppError');

const validateOrder = [
    body('shippingAddress')
    .notEmpty()
    .withMessage('Shipping Address is required')
    .isObject()
    .withMessage('Address must be an object'),

    body('shippingAddress.street')
    .notEmpty()
    .withMessage('Street is requrired')
    .isString()
    .withMessage('Street must be a string'),

    body('shippingAddress.city')
    .optional()
    .isString()
    .withMessage('City must be a string'),

    body('shippingAddress.country')
    .notEmpty()
    .withMessage('Country is required')
    .isString()
    .withMessage('Country must be a string'),

    body('paymentMethod')
    .notEmpty()
    .withMessage('Payment Method is required')
    .isString()
    .withMessage('Payment Method Details must be in a string')
];

const validateToUpdateStatus = [
    body('status')
    .notEmpty()
    .withMessage('Status is a required field')
    .isIn(['pending', 'delivered', 'confirmed', 'cancelled', 'shipped'])
    .withMessage('Invalid status')
]

const validateOrderID = [
    param('id')
    .notEmpty()
    .withMessage('Id is required')
    .isString()
    .withMessage('Invalid OrderID')
]

const validateUserID = [
    body('id')
    .notEmpty()
    .withMessage('Id is required')
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
    validateOrder,
    validateToUpdateStatus,
    validateOrderID,
    validateUserID,
    validator
}