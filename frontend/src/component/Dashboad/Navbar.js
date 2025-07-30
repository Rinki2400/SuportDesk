import React, { useState } from "react";
import "./Navbar.css";
import { FaChevronDown } from "react-icons/fa";

function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="custom-navbar">
      <div className="navbar-left">
        <span className="navbar-title"><h2>Support Desk</h2></span>
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
            <span className="profile-name">Luke Asote</span>
            <span className="profile-role">User</span>
          </div>
          <FaChevronDown className="dropdown-arrow" />
        </div>

        {dropdownOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-item">Profile</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item">Logout</div>
          </div>
        )}
  
    </nav>
  );
}

export default Navbar;
