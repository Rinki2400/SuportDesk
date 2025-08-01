import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import imglaptop from "../../assets/img.png";
import { createUser } from "../../api/axios";
import { validateUserLogin } from "../../utils/validateAdminLogin";

function SigUpForm() {
  const [username, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateUserLogin(username, email, password);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      const data = await createUser(email, password, username);
      console.log("📦 Full signup response:", data);

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
        console.warn(" Token not found in response");
      }
    } catch (err) {
      console.error("Signup failed:", err.message || err);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="main_Container">
      <div className="form_container">
        <div className="form_heading">
          <form onSubmit={handleSubmit}>
            <div className="title">
              <h1>Sign Up</h1>
            </div>

            <div className="login_field">
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
              {formErrors.username && <p className="error">{formErrors.username}</p>}
            </div>

            <div className="login_field">
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {formErrors.email && <p className="error">{formErrors.email}</p>}
            </div>

            <div className="login_field">
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {formErrors.password && <p className="error">{formErrors.password}</p>}
            </div>

            <button className="login_btn">Sign Up</button>
            <div className="create">
              Create Account ?{" "}
              <Link to="/">
                <span>Login</span>
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
  );
}

export default SigUpForm;
