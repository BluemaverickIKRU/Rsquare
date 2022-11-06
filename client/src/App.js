import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp/SignUp';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={'/signUp'} />} />
          <Route
            path="/signUp"
            element={
              <div>
                <SignUp />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
