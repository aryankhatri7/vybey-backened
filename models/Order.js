const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,          // 👈 customerName ❌ → name ✅
  phone: String,
  address: String,

  items: [               // 👈 products ❌ → items ✅
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  total: Number,

  paymentMethod: {
    type: String,
    default: "COD"
  },

  status: {              // 👈 future use (admin)
    type: String,
    default: "Pending"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Order', orderSchema);
