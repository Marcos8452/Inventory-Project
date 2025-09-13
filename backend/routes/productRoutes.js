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


module.exports = router;