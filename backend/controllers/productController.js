const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  try {
    // Generate unique product code
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await Product.countDocuments();
    const productCode = `PRD-${timestamp}-${count + 1}`;

    const product = new Product({
      name,
      description,
      price,
      quantity,
      category,
      productCode
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    console.error('[createProduct] Error:', err.message);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

