const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const upload = require("../multer"); // ✅ Cloudinary multer

// ✅ ADD PRODUCT (ADMIN)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    const product = new Product({
      name,
      price,
      image: req.file.path, // ✅ CLOUDINARY URL
    });

    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ✅ GET PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ DELETE PRODUCT (DB only)
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
