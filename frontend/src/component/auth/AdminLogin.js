import React, { useState } from "react";
import "./AdminLogin.css";
import { getAdminLogin } from "../../api/axios";
import { validateAdminLogin } from "../../utils/validateAdminLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateAdminLogin(email, password);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      const data = await getAdminLogin(email, password);
      console.log("Admin Logged In", data);
      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isAdmin", "true"); 
        navigate("/admin-dashboard");
      } else {
        console.warn("Token not found in response");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data?.message || err.message);
      toast.error("Admin Login failed. Please try again.");
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
          {errors.email && <p className="error">{errors.email}</p>}

          <input
            type="password"
            placeholder="Password"
            className="admin_input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <button type="submit" className="admin_button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
