const express = require('express');
const router  = express.Router();
const { createProduct } = require('../controllers/productController');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const Product = require('../models/Product');


router.post('/create', verifyToken, requireAdmin, createProduct);
router.get('/', (req, res) => {
  res.json({ msg: 'Products route works!' });
});
router.get('/search', verifyToken, async (req, res) => {
  const { query } = req.query;

  try {
    const product = await Product.findOne({
      $or: [
        { productCode: query },
        { name: new RegExp(query, 'i') } // case-insensitive name match
      ]
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('[searchProduct] Error:', err.message);
    res.status(500).json({ message: 'Search failed' });
  }
});

router.put('/update/:query', verifyToken, async (req, res) => {
  const { price, quantity } = req.body;
  const query = req.params.query;

  // Extract user info from token
  const user = req.user?.username || req.user?.email || req.user?.id || 'unknown';
  const role = req.user?.role || 'unknown';

  try {
    const product = await Product.findOne({
      $or: [
        { productCode: query },
        { name: new RegExp(`^${query}$`, 'i') }
      ]
    });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const changes = {};
    if (price !== undefined && price !== product.price) {
      changes.price = { from: product.price, to: price };
    }
    if (quantity !== undefined && quantity !== product.quantity) {
      changes.quantity = { from: product.quantity, to: quantity };
    }

    if (Object.keys(changes).length === 0) {
      return res.status(400).json({ message: 'No changes detected' });
    }

    product.history.push({
      updatedBy: user,
      role,
      timestamp: new Date(),
      action: Object.keys(changes).join(', '),
      changes
    });

    product.price = price;
    product.quantity = quantity;

    await product.save();
    res.json({ message: 'Product updated', product });
  } catch (err) {
    console.error('[updateProduct] Error:', err.message);
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

module.exports = router;