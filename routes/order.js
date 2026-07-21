const express = require('express');
const router = express.Router();
const {
    createOrder,
    getPastOrders,
    getSpecificOrder,
    updateStatus
} = require('../controllers/orderController');
const {
    validateOrder,
    validateToUpdateStatus,
    validateOrderID,
    validateUserID,
    validator
} = require('../middleware/validators/orderValidator');

router.post('/', validateUserID, validateOrder, validator, createOrder);
router.get('/', getPastOrders);
router.get('/:id', validateOrderID, validator, getSpecificOrder);
router.patch('/:id/status', validateOrderID, validateToUpdateStatus, validator, updateStatus);


module.exports = router;