import React, { useState } from "react";
import "./CreateTicketModal.css";
import { createTicket } from "../../api/axios";

const CreateTicketModal = ({ onClose, onTicketCreated, userId }) => {
  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    status: "Open",
    priority: "Low",
    category: "General",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticketPayload = {
      ...formData,
      user: userId,
    };

    try {
      await createTicket(ticketPayload);
      onTicketCreated();
      onClose();
    } catch (err) {
      console.error("Ticket creation failed:", err);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Ticket</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <select name="priority" value={formData.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>General</option>
            <option>Technical</option>
            <option>Billing</option>
            <option>Authentication</option>
          </select>
          <div className="modal-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTicketModal;
