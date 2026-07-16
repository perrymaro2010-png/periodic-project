const express = require('express');
const router = express.Router();
const {
    createOrder,
    getPastOrders,
    getSpecificOrder,
    updateStatus
} = require('../controllers/orderController');

router.post('/', createOrder);
router.get('/', getPastOrders);
router.get('/:id', getSpecificOrder);
router.patch('/:id/status', updateStatus);


module.exports = router;