const Product = require('../models/Product');

const generateProductCode = () => {
  const prefix = 'PRD';
  const random = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
  return `${prefix}-${random}`;
};

exports.createProduct = async (req, res) => {
  const { name, description, price, quantity, category } = req.body;

  try {
    // Check for existing product by name
    const existing = await Product.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existing) {
      return res.status(400).json({ message: 'Product with this name already exists' });
    }

    // Generate unique product code
    let productCode;
    do {
      productCode = generateProductCode();
    } while (await Product.findOne({ productCode }));

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

