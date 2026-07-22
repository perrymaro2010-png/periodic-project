const {body, param, validationResult} = require('express-validator');
const AppError = require('../../utils/AppError');

const validateCategory = [
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
    .trim()
    .isLength({min: 5})
    .withMessage('Must be a string with at least 5 characters.')

]

const validateID = [
    param('id')
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
    validateCategory,
    validateToUpdate,
    validateID,
    validator
}