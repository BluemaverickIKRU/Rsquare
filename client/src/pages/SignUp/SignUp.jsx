import React, { useState } from 'react';

import './SignUp.css';

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signUpReq = await fetch('http://localhost:3001/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });
    const signUpRes = await signUpReq.json();
    console.log(signUpRes);
  };

  return (
    <div className="signup-container">
      <div className="signup-title-container">
        <div className="signup-title">
          <h1>Welome to</h1>
          <h1>Rsquare.</h1>
          <p>
            Let's get you all set up with your account and begin with your
            profile
          </p>
        </div>
      </div>
      <div className="signup-form-container">
        <div className="signup-form-main">
          <div className="signup-form-title">
            <h2>Begin your journey !</h2>
            <p>Get started with the best platform for design</p>
          </div>
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="signup-form-fields">
              <div className="signup-input">
                <label className="signup-required">First Name</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      return { ...prev, firstName: e.target.value };
                    })
                  }
                />
              </div>
              <div className="signup-input">
                <label className="signup-required">Last Name</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      return { ...prev, lastName: e.target.value };
                    })
                  }
                />
              </div>
            </div>
            <div className="signup-form-fields">
              <div className="signup-input">
                <label className="signup-required">Email Address</label>
                <input
                  type="email"
                  required
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      return { ...prev, email: e.target.value };
                    })
                  }
                />
              </div>
              <div className="signup-input">
                <label className="signup-required">Phone Number</label>
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      return { ...prev, phoneNumber: e.target.value };
                    })
                  }
                />
              </div>
            </div>
            <div className="signup-form-fields">
              <div className="signup-input">
                <label className="signup-required">Password</label>
                <input
                  type="password"
                  onChange={(e) =>
                    setUserInfo((prev) => {
                      return { ...prev, password: e.target.value };
                    })
                  }
                />
              </div>
            </div>
            <div className="signup-form-fields">
              <input type="checkbox" required />
              <label>
                By signing up, you agree to our
                <span style={{ color: '#444278', fontWeight: '500' }}>
                  {' '}
                  User Aggrements
                </span>
                ,
                <span style={{ color: '#444278', fontWeight: '500' }}>
                  {' '}
                  Terms of Service
                </span>{' '}
                &
                <span style={{ color: '#444278', fontWeight: '500' }}>
                  {' '}
                  Privacy Policy
                </span>
              </label>
            </div>
            <div className="signup-button">
              <button>Sign Up</button>
              <p>
                Already have an account? <span>Log in</span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
