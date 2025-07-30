const Ticket = require("../models/TicketModel"); 

exports.createTicket = async (req, res) => {
  try {
    const { subject, description, priority, category } = req.body;
    const userId = req.user?.id || req.user?._id; 

    if (!subject || !description || !priority) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newTicket = new Ticket({
      user: userId,
      subject,
      description,
      priority,
      category,
      status: "Open", 
    });

    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

//GET ALL  Ticket

exports.getAllTicket = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const tickets = await Ticket.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

//get Ticket by id
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    if (ticket.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: "Error getting ticket", error });
  }
};
