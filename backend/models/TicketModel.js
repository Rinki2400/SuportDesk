const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  category: { type: String },
  status: { type: String, enum: ["Open", "In Progress", "Resolved", "Closed"], default: "Open" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Ticket", TicketSchema);
