import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getAlltickesAdmin, deleteTicket, updateTicket } from '../../api/axios'; 
import { toast } from 'react-toastify';

function TicketComp() {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({ subject: '', status: '' });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await getAlltickesAdmin();
      setTickets(data.tickets || data); 
    } catch (error) {
      toast.error('Error fetching tickets');
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      toast.success('Ticket deleted');
      fetchTickets(); 
    } catch (error) {
      toast.error('Failed to delete ticket');
      console.error(error);
    }
  };

  const handleUpdate = (ticket) => {
    setSelectedTicket(ticket);
    setFormData({ subject: ticket.subject, status: ticket.status });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async () => {
    try {
      await updateTicket(selectedTicket._id, formData);
      toast.success('Ticket updated');
      setShowModal(false);
      fetchTickets();
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="main_ticket_container">
      <h2 className="ticket-title">Ticket List</h2>
      <div className="ticketcontainer">
        <table className="ticket-table">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td>{index + 1}</td>
                  <td>{ticket.user?.username || "N/A"}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.status}</td>
                  <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="icon-btn edit-btn" onClick={() => handleUpdate(ticket)}>
                      <FaEdit />
                    </button>
                    <button className="icon-btn delete-btn" onClick={() => handleDelete(ticket._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No tickets found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Update Ticket</h3>
            <label>Subject:</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleInputChange}
            />
            <label>Status:</label>
            <select name="status" value={formData.status} onChange={handleInputChange}>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
            <div className="modal-buttons">
              <button onClick={handleModalSubmit}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketComp;
