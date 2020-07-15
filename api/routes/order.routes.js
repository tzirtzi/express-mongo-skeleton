const express = require("express");
const router = express.Router();

const orderService = require("../services/order.service");

// Handle incoming GET requests to /orders
router.get("/", (req, res, next) => {
  orderService.getOrders(req, res, next);
});

router.post("/", (req, res, next) => {
  orderService.postOrder(req, res, next);
});

router.get("/:orderId", (req, res, next) => {
  orderService.getOrder(req, res, next);
});

router.delete("/:orderId", (req, res, next) => {
  orderService.deleteOrder(req, res, next);
});

module.exports = router;
