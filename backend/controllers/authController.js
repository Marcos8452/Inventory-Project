const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Admin creates user
exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: 'Username already taken' });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashed,
      role,
      passwordInitialized: false
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('[register] Error:', err.message);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// User logs in
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        passwordInitialized: user.passwordInitialized
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error('[login] Error:', err.message);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// User sets their own password
exports.setPassword = async (req, res) => {
  const { newPassword } = req.body;

  try {
    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(req.user.userId, {
      password: hashed,
      passwordInitialized: true
    });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('[setPassword] Error:', err.message);
    res.status(500).json({ message: 'Failed to update password' });
  }
};
