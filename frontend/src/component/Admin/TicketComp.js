import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  getAlltickesAdmin,
  deleteTicket,
  updateTicket,
} from "../../api/axios";
import { toast } from "react-toastify";

function TicketComp() {
  const [tickets, setTickets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({ subject: "", status: "" });
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUser, setFilterUser] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const ticketsPerPage = 5;

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await getAlltickesAdmin();
      setTickets(data.tickets || data);
    } catch (error) {
      toast.error("Error fetching tickets");
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      toast.success("Ticket deleted");
      fetchTickets();
    } catch (error) {
      toast.error("Failed to delete ticket");
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async () => {
    try {
      await updateTicket(selectedTicket._id, formData);
      toast.success("Ticket updated");
      setShowModal(false);
      fetchTickets();
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  // Filter logic
  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus = filterStatus ? ticket.status === filterStatus : true;
    const matchesUser = filterUser
      ? ticket.user?.username?.toLowerCase().includes(filterUser.toLowerCase())
      : true;
    return matchesStatus && matchesUser;
  });

  // Pagination logic
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="main_ticket_container">
      <h2 className="ticket-title">Ticket List</h2>

      {/* Filter Section */}
      <div className="filter-container">
        <label>Status:</label>
        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1); // Reset to page 1 on filter
          }}
        >
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>

        <label>User:</label>
        <input
          type="text"
          placeholder="Search by username"
          value={filterUser}
          onChange={(e) => {
            setFilterUser(e.target.value);
            setCurrentPage(1); // Reset to page 1 on search
          }}
        />

        <button
          className="reset-filter"
          onClick={() => {
            setFilterStatus("");
            setFilterUser("");
            setCurrentPage(1);
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Ticket Table */}
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
            {currentTickets.length > 0 ? (
              currentTickets.map((ticket, index) => (
                <tr key={ticket._id}>
                  <td>{indexOfFirstTicket + index + 1}</td>
                  <td>{ticket.user?.username || "N/A"}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.status}</td>
                  <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="icon-btn edit-btn"
                      onClick={() => handleUpdate(ticket)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="icon-btn delete-btn"
                      onClick={() => handleDelete(ticket._id)}
                    >
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

      {/* Pagination Controls */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={currentPage === i + 1 ? "active" : ""}
          >
            {i + 1}
          </button>
        ))}
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
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
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
