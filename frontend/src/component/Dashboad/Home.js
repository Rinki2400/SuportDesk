import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../Dashboad/Navbar";
import { getAllTicket } from "../../api/axios";
import CreateTicketModal from "../Dashboad/CreateTicketModal";

function Home() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await getAllTicket();
      setTickets(data);
    } catch (err) {
      console.error("Failed to fetch tickets:", err.response?.data || err.message);
      setError("Could not load tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);


  const handleTicketCreated = () => {
    fetchTickets(); 
    setShowModal(false); 
  };

  return (
    <div className="home-container">
      <Navbar />
      <div className="table-section">
        <div className="header-with-button">
          <h2>My Tickets</h2>
          <button className="create-ticket-btn" onClick={() => setShowModal(true)}>
            + Create Ticket
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error-text">{error}</p>
        ) : tickets.length === 0 ? (
          <p>No tickets found.</p>
        ) : (
          <div className="table-wrapper">
            <table className="styled-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Category</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr key={ticket._id}>
                    <td>{index + 1}</td>
                    <td>{ticket.subject}</td>
                    <td>
                      <span className={`badge ${ticket.status?.toLowerCase() || "unknown"}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.category}</td>
                    <td>
                      {ticket.createdAt
                        ? new Date(ticket.createdAt).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

     
      {showModal && (
        <CreateTicketModal
          onClose={() => setShowModal(false)}
          onTicketCreated={handleTicketCreated}
        />
      )}
    </div>
  );
}

export default Home;
