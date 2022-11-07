import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { setUserInfoAction } from '../../store/userSlice';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [passwordVisibile, setPasswordVisibile] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('It works');
  };
  return (
    <div className="login-container">
      <div className="login-title-container">
        <div className="login-title">
          <h1>Welome to</h1>
          <h1>Rsquare.</h1>
          <p>
            Let's get you all set up with your account and begin with your
            profile
          </p>
        </div>
      </div>
      <div className="login-form-container">
        <div className="login-form-main">
          <div className="login-form-title">
            <h2>Welcome back !</h2>
            <p>Please enter your details.</p>
          </div>
          <form onSubmit={handleSubmit} className="login-form">
            <div className="login-input">
              <label className="login-required" htmlFor="email-input">
                Email
              </label>
              <input type="mail" required placeholder="jhonathan@abc.com" />
            </div>
            <div className="login-input">
              <label className="login-required" htmlFor="password-input">
                Password
              </label>
              <input required type={passwordVisibile ? 'text' : 'password'} />
            </div>
            <div className="checkbox-forgotPass-div">
              <div className="login-checkbox">
                <input type="checkbox" />
                <label htmlFor="checkbox-login">Remember me</label>
              </div>
              <p>Forgot Password?</p>
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
