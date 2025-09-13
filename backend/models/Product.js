const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String },
  price:       { type: Number, required: true },
  quantity:    { type: Number, required: true },
  category:    { type: String },
  productCode: { type: String, required: true, unique: true },
  createdAt:   { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);

