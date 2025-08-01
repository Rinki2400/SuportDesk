
import React from "react";
import { FaTicketAlt, FaHourglassHalf, FaTools, FaCheckCircle,FaBan  } from "react-icons/fa";
import "./AdminDashboard.css"

function AdminCards({ stats }) {
  return (
    <div className="admin-dashboard-content">
      <div className="admin-card">
        <div className="admin-card-icon total">
          <FaTicketAlt />
        </div>
        <div className="admin-card-info">
          <h3>Total Tickets</h3>
          <p>{stats.total}</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-icon pending">
          <FaHourglassHalf />
        </div>
        <div className="admin-card-info">
          <h3>Pending</h3>
          <p>{stats.pending}</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-icon progress">
          <FaTools />
        </div>
        <div className="admin-card-info">
          <h3>In Progress</h3>
          <p>{stats.inProgress}</p>
        </div>
      </div>

      <div className="admin-card">
        <div className="admin-card-icon resolved">
          <FaCheckCircle />
        </div>
        <div className="admin-card-info">
          <h3>Resolved</h3>
          <p>{stats.resolved}</p>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-icon resolved">
          <FaBan  />
        </div>
        <div className="admin-card-info">
          <h3>Closed</h3>
          <p>{stats.closed}</p>
        </div>
      </div>
    </div>
  );
}

export default AdminCards;
