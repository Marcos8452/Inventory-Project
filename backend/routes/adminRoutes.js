const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { verifyToken, requireAdmin } = require('../middleware/auth');

// GET all users (admin only)
router.get('/users', verifyToken, requireAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// DELETE a user by ID (admin only)
router.delete('/users/:id', verifyToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  if (id === req.user.userId) {
    return res.status(400).json({ message: "You can't delete yourself" });
  }
  await User.findByIdAndDelete(id);
  res.json({ message: 'User deleted' });
});

module.exports = router;
