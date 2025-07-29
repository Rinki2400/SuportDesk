const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



// Generate JWT Token
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24d' }
  );
};

// @route  POST /api/auth/register
exports.register = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      role: role || 'user', 
    });

    const token = generateToken(newUser);

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};


// @route  POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(user);

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};


exports.createOrLoginAdmin = async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      const isMatch =  bcrypt.compare(password, existingAdmin.password);
      if (!isMatch) {
        return res.status(401).json({ message: '❌ Admin password mismatch' });
      }

      const token = jwt.sign(
        { id: existingAdmin._id, role: existingAdmin.role },
        process.env.JWT_SECRET,
        { expiresIn: '24d' }
      );

      return res.status(200).json({
        message: '✅ Admin already exists and logged in',
        token,
        admin: {
          _id: existingAdmin._id,
          username: existingAdmin.username,
          email: existingAdmin.email,
          role: existingAdmin.role,
        },
      });
    }

    const hashedPassword = bcrypt.hash(password, 10);
    const newAdmin = await User.create({
      username: 'Admin',
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const token = jwt.sign(
      { id: newAdmin._id, role: newAdmin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24d' }
    );

    return res.status(201).json({
      message: '✅ Admin created and logged in',
      token,
      admin: {
        _id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });

  } catch (error) {
    console.error('❌ Error during admin setup:', error.message);
    return res.status(500).json({ message: 'Server error during admin setup', error: error.message });
  }
};
