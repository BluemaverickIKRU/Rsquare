import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import OTPInput, { ResendOTP } from 'otp-input-react';

import './verifyMail.css';

const VerifyMail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOtp] = useState();

  return (
    <div>
      <div className="mail-verify-container">
        <p>
          We have sent you a OTP to the registered mail. Kindly enter the OTP
          below.
        </p>
        <OTPInput
          value={otp}
          onChange={setOtp}
          autoFocus
          OTPLength={4}
          otpType="number"
          disabled={false}
          secure
        />
        <ResendOTP onResendClick={() => console.log('Resend clicked')} />
      </div>
    </div>
  );
};

export default VerifyMail;
