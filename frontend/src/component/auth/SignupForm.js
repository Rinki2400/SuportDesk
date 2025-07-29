import React from "react";
import "./LoginForm.css";
import { Link } from "react-router-dom";
import imglaptop from "../../assets/img.png";

function SigUpForm() {
  return (
    <div className="main_Container">
      <div className="form_container">
        <div className="form_heading">
          <form>
            <div className="title">
              <h1>Sign Up</h1>
            </div>
            <div className="login_field">
              <input type="text" placeholder="Enter Username" />
            </div>
            <div className="login_field">
              <input type="email" placeholder="Enter Email" />
            </div>
            <div className="login_field">
              <input type="password" placeholder="Enter Password" />
            </div>

            <button className="login_btn">Sign Up</button>
            <div className="create">
              create Account ?{" "}
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
