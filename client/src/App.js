import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import VerifyMail from './pages/VerifyMail/VerifyMail';

const App = () => {
  const isEmailVerified = useSelector((state) => state.user.emailVerified);
  const userMail = useSelector((state) => state.user.email);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/signUp'} />} />
          <Route
            path="/login"
            element={
              <div>
                <Login />
              </div>
            }
          />
          <Route
            path="/signUp"
            element={
              <div>
                <SignUp />
              </div>
            }
          />
          <Route
            path="/verifyMail"
            element={
              !isEmailVerified && userMail === '' ? (
                <Navigate to={'/login'} />
              ) : (
                <VerifyMail />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
