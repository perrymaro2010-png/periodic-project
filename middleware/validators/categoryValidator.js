const {body, param, validationResult} = require('express-validator');
const AppError = require('../../utils/AppError');

const validateCategory = [
    body('name')
    .notEmpty()
    .withMessage('Name is a required field.')
    .trim()
    .isString()
    .withMessage('Name must be a string.'),

    body('description')
    .notEmpty()
    .withMessage('Description is a required field.')
    .trim()
    .isString()
    .withMessage('Must be a string')
    .isLength({min: 5})
    .withMessage('Must be a string with a length more than at least 5 characters.'),
];

const validateToUpdate = [
    body('name')
    .optional()
    .trim()
    .isString()
    .withMessage('Name must be a string'),

    body('description')
    .optional()
    .trim()
    .isString()
    .withMessage('Must be a string')
    .isLength({min: 5})
    .withMessage('Must be a string with at least 5 characters.'),

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
    validateCategory,
    validateToUpdate,
    validateID,
    validator
}