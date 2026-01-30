const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const upload = require("../multer"); // ✅ Cloudinary multer

// ✅ ADD PRODUCT (ADMIN)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;

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
    });

    await product.save();
    res.json({ success: true, product });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// ✅ GET PRODUCTS (with optional bestSeller filter)
router.get("/", async (req, res) => {
  try {

    let query = {};

    if (req.query.bestSeller === "true") {
      query.bestSeller = true;
    }

    const products = await Product
      .find(query)
      .sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ DELETE PRODUCT (DB only)
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
