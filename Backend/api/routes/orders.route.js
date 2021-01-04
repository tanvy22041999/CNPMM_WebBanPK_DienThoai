const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ordersrouters = require("../controllers/orders.controllers");

router.get("/",ordersrouters.findAll)
router.put("/:orderId",ordersrouters.update );
router.get("/:orderId", ordersrouters.findOne);
router.post('/', ordersrouters.create);
router.delete("/:orderId", ordersrouters.delete)


module.exports = router;