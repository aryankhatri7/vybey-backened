const express = require("express");
const router = express.Router();
const Order = require("../models/order");

// PLACE ORDER
router.post("/add", async (req, res) => {
  try {
    const newOrder = new Order({
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod || "COD",
      items: req.body.items,
      total: req.body.total
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
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
