import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { getAlltickesAdmin, deleteTicket } from '../../api/axios'; // adjust path if needed
import { toast } from 'react-toastify';

function TicketComp() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

const fetchTickets = async () => {
  try {
    const data = await getAlltickesAdmin();
    console.log("Tickets response:", data); // 👀 Inspect this in browser dev tools
    setTickets(data.tickets || data); // adjust according to actual structure
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

  const handleUpdate = (ticketId) => {
    toast.info(`Update ticket: ${ticketId}`);
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
                    <button className="icon-btn edit-btn" onClick={() => handleUpdate(ticket._id)}>
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
    </div>
  );
}

export default TicketComp;
