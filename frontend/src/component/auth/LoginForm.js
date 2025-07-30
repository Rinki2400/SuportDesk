import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import imglaptop from "../../assets/img.png";
import { getUserlogin } from "../../api/axios";
import { validateUserLogin } from "../../utils/validateAdminLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateUserLogin(email, password);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const data = await getUserlogin(email, password);
      console.log("Full Login response:", data);

      const token = data.token;
      const user = {
        _id: data._id,
        username: data.username,
        email: data.email,
        role: data.role,
      };

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        console.warn("Token not found in response");
      }

    } catch (err) {
      console.error("Login failed:", err.message || err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="page_wrapper">
      <nav className="navbar">
        <div className="navbar_content">
          <Link to="/admin-login" className="navbar_btn">
            Admin Login
          </Link>
        </div>
      </nav>

      <div className="main_Container">
        <div className="form_container">
          <div className="form_heading">
            <form onSubmit={handleSubmit}>
              <div className="title">
                <h1>Login</h1>
              </div>
              <div className="login_field">
                <input
                  type="email"
                  placeholder=" "
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Enter Email</label>
                {formErrors.email && <p className="error">{formErrors.email}</p>}
              </div>

              <div className="login_field">
                <input
                  type="password"
                  placeholder=" "
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Enter Password</label>
                {formErrors.password && <p className="error">{formErrors.password}</p>}
              </div>

              <button className="login_btn">Login</button>
              <div className="create">
                Create Account ?{" "}
                <Link to="/signup">
                  <span>SignUp</span>
                </Link>
              </div>
            </form>
          </div>
        </div>

        <div className="img_container">
          <div className="first_container"></div>
          <div className="second_container"></div>
          <div className="third_container"></div>
          <div className="img_wrapper">
            <img src={imglaptop} alt="laptop" className="img" />
          </div>
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
