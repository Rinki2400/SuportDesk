const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.createOrLoginAdmin = async (req, res) => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      const isMatch =  bcrypt.compare(password, existingAdmin.password);
      if (!isMatch) {
        return res.status(401).json({ message: ' Admin password mismatch' });
      }

      const token = jwt.sign(
        { id: existingAdmin._id, role: existingAdmin.role },
        process.env.JWT_SECRET,
        { expiresIn: '24d' }
      );

      return res.status(200).json({
        message: ' Admin already exists and logged in',
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
      message: ' Admin created and logged in',
      token,
      admin: {
        _id: newAdmin._id,
        username: newAdmin.username,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });

  } catch (error) {
    console.error(' Error during admin setup:', error.message);
    return res.status(500).json({ message: 'Server error during admin setup', error: error.message });
  }
};
