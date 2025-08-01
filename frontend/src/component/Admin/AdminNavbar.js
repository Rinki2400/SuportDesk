import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminNavbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admintoken");
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  return (
    <div className="admin-navbar">
      <div className="admin-left">
        <h2 className="admin-title">Admin Dashboard</h2>
      </div>

      <div className="admin-wrapper" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <div className="admin-info">
          <span className="admin-role">Admin</span>
        </div>
        <FaChevronDown className="admin-arrow" />
      </div>

      {dropdownOpen && (
        <div className="admin-menu">
          <div className="admin-item" onClick={() => navigate("/manage-tickets")}>
            Manage Ticket
          </div>
          <div className="admin-item">Settings</div>
          <div className="admin-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminNavbar;
