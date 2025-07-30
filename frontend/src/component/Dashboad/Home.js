import React from "react";
import "./Home.css";
import Navbar from "../Dashboad/Navbar";

const mockData = [
  { id: 1, title: "Login Issue", status: "Open", date: "2025-07-30" },
  { id: 2, title: "Page Crash", status: "Resolved", date: "2025-07-28" },
  { id: 3, title: "Billing Error", status: "Pending", date: "2025-07-25" },
];

function Home() {
  return (
    <div className="home-container">
      <Navbar />

      <div className="table-section">
        <div className="header-with-button">
          <h2>My Support Tickets</h2>
          <button className="create-ticket-btn">+ Create Ticket</button>
        </div>

        <div className="table-wrapper">
          <table className="styled-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map((ticket, index) => (
                <tr key={ticket.id}>
                  <td>{index + 1}</td>
                  <td>{ticket.title}</td>
                  <td>
                    <span className={`badge ${ticket.status.toLowerCase()}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
