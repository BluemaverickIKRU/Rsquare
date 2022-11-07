import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCookies } from 'react-cookie';

import './Login.css';
import { logOnOrOffAction, setUserInfoAction } from '../../store/userSlice';

const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const [passwordVisibile, setPasswordVisibile] = useState(false);

  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(['tkn']);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginReq = await fetch('http://localhost:3001/api/checkUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const loginRes = await loginReq.json();
    if (loginRes.statusCode === 200) {
      const { firstName, lastName, email, mailVerified } = loginRes.dbData;
      dispatch(setUserInfoAction({ firstName, lastName, email, mailVerified }));
      dispatch(logOnOrOffAction(true));
      setCookie('tkn', loginRes.token);
      if (loginRes.dbData.mailVerified) {
        navigate('/home');
      } else {
        const sendOtpReq = await fetch('http://localhost:3001/api/sendOTP', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: loginRes.dbData._id,
            email: loginRes.dbData.email,
          }),
        });
        const sendOtpRes = await sendOtpReq.json();
        console.log(sendOtpRes);
        navigate('/verifyEmail');
      }
    } else {
      console.log(loginRes.message);
    }
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
              <input
                value={userInfo.email}
                type="mail"
                required
                placeholder="jhonathan@abc.com"
                onChange={(e) =>
                  setUserInfo((prev) => {
                    return { ...prev, email: e.target.value };
                  })
                }
              />
            </div>
            <div className="login-input" style={{ marginBottom: '0.5em' }}>
              <label className="login-required" htmlFor="password-input">
                Password
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '25em',
                }}
              >
                <input
                  value={userInfo.password}
                  required
                  type={passwordVisibile ? 'text' : 'password'}
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                />
                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => setPasswordVisibile(!passwordVisibile)}
                >
                  {passwordVisibile ? (
                    <VisibilityIcon style={{ marginLeft: '0.2em' }} />
                  ) : (
                    <VisibilityOffIcon style={{ marginLeft: '0.2em' }} />
                  )}
                </div>
              </div>
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
