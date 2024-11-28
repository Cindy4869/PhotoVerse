import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Authentication, LandingPage, HomePage, UserPage } from './components/authentication';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginClick = () => {
    setIsLogin(true);
    setShowAuth(true);
  };

  const handleSignUpClick = () => {
    setIsLogin(false);
    setShowAuth(true);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            !showAuth ? (
              <LandingPage onLoginClick={handleLoginClick} onSignUpClick={handleSignUpClick} />
            ) : (
              <Authentication />
            )
          }
        />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element = {<UserPage/>} />
      </Routes>
    </Router>
  );
}

export default App;