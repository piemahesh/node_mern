const express = require("express");
const { createOrder, getOrders } = require("../controllers/order_controller");
const { verifyToken } = require("../middleware/authMiddleware");
const routes = express().router;

routes.post("/create", verifyToken, createOrder);

routes.get("/get", verifyToken, getOrders);

module.exports = { routes };
