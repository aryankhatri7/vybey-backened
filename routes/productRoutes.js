const express = require("express");
const multer = require("multer");
const Product = require("../models/Product");

const router = express.Router();

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// ADD PRODUCT (ADMIN)
router.post("/add", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.file.filename
    });

    await product.save();
    res.json({ success: true, message: "Product added" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET PRODUCTS
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// DELETE PRODUCT + IMAGE
const fs = require("fs");
const path = require("path");

router.delete("/:id", async (req, res) => {
  try {
    // 1️⃣ pehle product find karo
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2️⃣ image ka path banao
    const imagePath = path.join(__dirname, "..", "uploads", product.image);

    // 3️⃣ image delete karo (agar exist karti ho)
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // 4️⃣ product delete from DB
    await Product.findByIdAndDelete(req.params.id);

    res.json({ message: "Product + Image deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;

