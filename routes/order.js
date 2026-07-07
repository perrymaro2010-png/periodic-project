const express = require('express');
const router = express.Router();
const {
    createOrder,
    getPastOrders,
    getSpecificOrder
} = require('../controllers/orderController');

router.post('/:id', createOrder);
router.get('/:id', getPastOrders);
router.get('/:userID/:orderID', getSpecificOrder);


module.exports = router;