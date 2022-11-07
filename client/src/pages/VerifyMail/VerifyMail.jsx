import React, { useState } from 'react';
import OTPInput from 'otp-input-react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './verifyMail.css';
import { verifyEmail } from '../../store/userSlice';

const VerifyMail = () => {
  const [otp, setOtp] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line
  const [cookie, setCookie] = useCookies(['tkn']);

  const handleVerify = async () => {
    const checkOtpReq = await fetch('http://localhost:3001/api/validateOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otp, token: cookie.tkn }),
    });
    const checkOtpRes = await checkOtpReq.json();
    if (checkOtpRes.statusCode === 200) {
      navigate('/home');
      dispatch(verifyEmail(true));
    } else {
      console.log(checkOtpRes);
    }
  };

  return (
    <div className="mail-verify-container">
      <h3
        style={{
          fontFamily: 'monospace',
          margin: '0',
          padding: '1em',
          fontStyle: 'oblique',
          textDecoration: 'underline',
        }}
      >
        Rsquare email verification
      </h3>
      <div className="mail-verify-otp">
        <p>
          We have sent you a OTP to the registered mail. Kindly enter the OTP
          below.
        </p>
        <OTPInput
          style={{
            margin: '2em auto',
            width: 'fit-content',
          }}
          value={otp}
          onChange={setOtp}
          autoFocus
          OTPLength={4}
          otpType="number"
          disabled={false}
        />
        <button onClick={handleVerify}>Verify</button>
      </div>
    </div>
  );
};

export default VerifyMail;
