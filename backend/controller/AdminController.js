const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Ticket = require('../models/TicketModel');

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


// get all ticket

exports.getAlltickesAdmin = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("user", "username email"); 
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.updateTicketByAdmin = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const updateData = req.body;

    const ticket = await Ticket.findById(ticketId).populate("user", "username email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update only allowed fields
    if (updateData.subject !== undefined) ticket.subject = updateData.subject;
    if (updateData.status !== undefined) ticket.status = updateData.status;

    const updatedTicket = await ticket.save();

    res.status(200).json({
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


exports.deleteAlltickesAdminById = async (req, res) => {
  try {
    const ticketId = req.params.id;

    const deletedTicket = await Ticket.findByIdAndDelete(ticketId);

    if (!deletedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket deleted successfully" });
  } catch (error) {
    console.error("Error deleting ticket:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getDashboardStats = async (req, res) => {
  try {
    const total = await Ticket.countDocuments();
    const pending = await Ticket.countDocuments({ status: "pending" });
    const inProgress = await Ticket.countDocuments({ status: "in progress" });
    const resolved = await Ticket.countDocuments({ status: "resolved" });

    res.json({
      total,
      pending,
      inProgress,
      resolved,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
