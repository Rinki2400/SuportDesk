import React from 'react';
import './AdminLogin.css';

function AdminLogin() {
  return (
    <div className="admin_container">
      <div className="admin_glow"></div>
      <div className="admin_card">
        <div className="admin_logo">🛡️</div>
        <h2>Admin Panel</h2>
        <form className="admin_form">
          <input type="email" placeholder="Admin Email" className="admin_input" />
          <input type="password" placeholder="Password" className="admin_input" />
          <button type="submit" className="admin_button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
