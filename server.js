require("dotenv").config({ path: "./.env" });
console.log("🔥 ENV CHECK:", {
  cloud: process.env.CLOUDINARY_CLOUD_NAME,
  key: process.env.CLOUDINARY_API_KEY,
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

console.log("🔥 THIS IS MY SERVER.JS FILE 🔥");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://aryankhatri:vybey2025@cluster0.gf61skt.mongodb.net/?appName=Cluster0")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/uploads", express.static("uploads"));

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/orders-test", (req, res) => {
  res.json({ message: "Orders route reachable" });
});

app.use("/api/orders", orderRoutes);


app.get("/", (req, res) => {
  res.send("VYBEY Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
