import logo from "./logo.svg";
import "./App.css";

import React, { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
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

// const HomeWrapper = () => {
//   const { initializeUser, user } = useContext(UserContext);
//   const location = useLocation();
//   const params = new URLSearchParams(location.search);
//   const userId = params.get("user_id");

//   useEffect(() => {
//     console.log("userId from URL:", userId); // Debug query parameter
//     if (userId) {
//       initializeUser(userId);
//     }
//   }, [userId, initializeUser]);

//   if (!user) return <p>Loading user data...</p>;

//   return <HomePage />;
// };

export default App;
