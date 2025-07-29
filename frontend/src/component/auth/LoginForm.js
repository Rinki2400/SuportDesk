import React, { useState } from "react";
import "./LoginForm.css";
import { Link, useNavigate } from "react-router-dom";
import imglaptop from "../../assets/img.png";
import { getUserlogin } from "../../api/axios";

function LoginForm() {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const data = await getUserlogin(email, password);
        console.log(" Logged In", data);
      } catch (err) {
        console.error("Login Error:", err.response?.data?.message || err.message);
        navigate('/home')
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
                  required
                  value={email}
                 onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="email">Enter Email</label>
              </div>
              <div className="login_field">
                <input
                  type="password"
                  placeholder=" "
                  id="password"
                  required
                  value={password}
                 onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="password">Enter Password</label>
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
