import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUsername(parsedUser.username || "User");
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error);
      }
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
    navigate("/"); 
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        <span className="navbar-title">
          <h2>Support Desk</h2>
        </span>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="🔍 Search..."
          className="navbar-search"
        />
      </div>

      <div
        className="profile-wrapper"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <div className="profile-info">
          <span className="profile-name">{username || "Guest"}</span>
          <span className="profile-role">User</span>
        </div>
        <FaChevronDown className="dropdown-arrow" />
      </div>

      {dropdownOpen && (
        <div className="dropdown-menu">
          <div className="dropdown-item">Profile</div>
          <div className="dropdown-item">Settings</div>
          <div className="dropdown-item" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
