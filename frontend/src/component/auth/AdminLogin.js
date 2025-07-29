import React, { useState } from "react";
import "./AdminLogin.css";
import { getAdminLogin } from "../../api/axios";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await getAdminLogin(email, password);
      console.log("Admin Logged In", data);
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="admin_container">
      <div className="admin_glow"></div>
      <div className="admin_card">
        <div className="admin_logo">🛡️</div>
        <h2>Admin Panel</h2>
        <form className="admin_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Admin Email"
            className="admin_input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="admin_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="admin_button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
