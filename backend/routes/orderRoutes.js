const express = require("express");
const { protect, optionalAuth } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");
const router = express.Router();
const { createOrder, getOrders, myOrders, updateOrderStatus } = require("../controllers/orderController.js");

router.route('/')
  .get(protect, admin, getOrders)
  .post(optionalAuth, createOrder);

router.route('/:id/status').put(protect, admin, updateOrderStatus);
router.route('/my-orders').get(protect, myOrders);

module.exports = router;