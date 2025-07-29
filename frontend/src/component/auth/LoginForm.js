import React from 'react';
import './LoginForm.css';
import { Link } from 'react-router-dom';
import imglaptop from "../../assets/img.png";

function LoginForm() {
  return (
    <div className='page_wrapper'>
      <nav className="navbar">
        <div className="navbar_content">
          <Link to="/admin-login" className="navbar_btn">Admin Login</Link>
        </div>
      </nav>

      <div className='main_Container'>
        <div className="form_container">
          <div className="form_heading">
            <form>
              <div className="title">
                <h1>Login</h1>
              </div>
              <div className="login_field">
                <input type="email" placeholder=" " id="email" required />
                <label htmlFor="email">Enter Email</label>
              </div>
              <div className="login_field">
                <input type="password" placeholder=" " id="password" required />
                <label htmlFor="password">Enter Password</label>
              </div>
              <button className='login_btn'>Login</button>
              <div className="create">
                Create Account ? <Link to="/signup"><span>SignUp</span></Link>
              </div>
            </form>
          </div>
        </div>

        <div className="img_container">
          <div className="first_container"></div>
          <div className="second_container"></div>
          <div className="third_container"></div>
          <div className="img_wrapper">
            <img src={imglaptop} alt="laptop" className='img' />
          </div>
          <div className="blob blob1"></div>
          <div className="blob blob2"></div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
