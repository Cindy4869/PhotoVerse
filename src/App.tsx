import logo from "./logo.svg";
import "./App.css";

import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Authentication from "./components/authentication";
import HomePage from "./components/home";
import LandingPage from "./components/landing";
import UserPage from "./components/user";
import CreatePost from "./components/create";
import { UserProvider } from "./context/UserContext";

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
    <UserProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                !showAuth ? (
                  <LandingPage
                    onLoginClick={handleLoginClick}
                    onSignUpClick={handleSignUpClick}
                  />
                ) : (
                  <Authentication />
                )
              }
            />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<UserPage />} />
            <Route path="/create" element={<CreatePost />} />
          </Routes>
        </Router>
    </UserProvider>
    
  );
}

export default App;
