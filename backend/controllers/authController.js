const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ username, password: hashed, role });
    return res.status(201).json({ id: user._id, username: user.username });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};