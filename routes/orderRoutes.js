const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/Order");

// PLACE ORDER
router.post("/add", async (req, res) => {
  try {

    const { name, phone, address, items, total } = req.body;

    if (!name || !phone || !address || !items || !total) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Items must be non-empty array" });
    }

    if (isNaN(total)) {
      return res.status(400).json({ message: "Total must be number" });
    }

    const newOrder = new Order({
       name,
       phone,
       address,
       paymentMethod: req.body.paymentMethod || "COD",
       items,
       total
    });

    await newOrder.save();
    res.status(201).json({ message: "Order saved" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get orders of logged-in user
router.get("/my-orders/:userId", async (req, res) => {
  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
      return res.status(400).json({ message: "Invalid user id" });
    }

    const orders = await Order.find({ userId: req.params.userId })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user orders" });
  }
});

// GET ALL ORDERS (latest first)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE ORDER STATUS
router.patch("/:id", async (req, res) => {
  try {
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ message: "Invalid order id" });
}

if (!req.body.status) {
  return res.status(400).json({ message: "Status is required" });
}

const allowedStatus = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

if (!allowedStatus.includes(req.body.status)) {
  return res.status(400).json({ message: "Invalid status value" });
}


    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE ORDER
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ message: "Invalid order id" });
}

    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
