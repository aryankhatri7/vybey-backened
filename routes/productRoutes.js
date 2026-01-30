const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const upload = require("../multer");

// ✅ ADD PRODUCT (ADMIN)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price, trending, bestSeller } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price required" });
    }

    if (isNaN(price)) {
      return res.status(400).json({ message: "Price must be number" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const product = new Product({
      name,
      price,
      image: req.file.path,
      trending: trending === "true",
      bestSeller: bestSeller === "true"
    });

    await product.save();
    res.json({ success: true, product });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// ✅ GET PRODUCTS (FILTER SUPPORT)
router.get("/", async (req, res) => {
  try {
    let filter = {};

    if (req.query.trending === "true") {
      filter.trending = true;
    }

    if (req.query.bestSeller === "true") {
      filter.bestSeller = true;
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);

  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product id" });
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
