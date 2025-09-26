const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  quantity:    { type: Number, required: true },
  category:    { type: String, enum: ['food', 'clothes', 'accessories', 'electronics'], required: true },
  productCode: { type: String, required: true, unique: true },
  history: [
    {
      updatedBy: String,       // username or email
      role: String,            // user role (admin, manager, staff)
      timestamp: { type: Date, default: Date.now },
      action: String,          // e.g. "price", "quantity", or "price, quantity"
      changes: {
        price: {
          from: Number,
          to: Number
        },
        quantity: {
          from: Number,
          to: Number
        }
      }
    }
  ],
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);


