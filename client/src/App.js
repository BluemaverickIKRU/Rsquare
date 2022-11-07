import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import VerifyMail from './pages/VerifyMail/VerifyMail';
import Home from './pages/Home/Home';

const App = () => {
  const isEmailVerified = useSelector((state) => state.user.emailVerified);
  const userLogged = useSelector((state) => state.user.isLogged);

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
            path="/verifyEmail"
            element={
              isEmailVerified ? <Navigate to={'/home'} /> : <VerifyMail />
            }
          />
          <Route
            path="/home"
            element={userLogged ? <Home /> : <Navigate to={'/login'} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
