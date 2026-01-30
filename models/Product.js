const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 120
  },

  price: {
    type: Number,
    required: true,
    min: 0
  },

  image: {
    type: String,
    required: true,
    trim: true
  },   // ✅ comma needed here

  bestSeller: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
