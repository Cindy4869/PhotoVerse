import { useState } from "react";
import "./authentication.css";
import auth_img from "../imgs/auth-pic.jpg";

function Authentication() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    // Store user data in localStorage for simplicity
    if (!isLogin) {
      localStorage.setItem(
        email,
        JSON.stringify({ username, email, password })
      );
      localStorage.setItem("loggedInUser", email);
      alert("Account created successfully!");
      window.location.replace("/home");
    } else {
      const userData = localStorage.getItem(email);
      if (userData) {
        const parsedData = JSON.parse(userData);
        if (parsedData.password === password) {
          localStorage.setItem("loggedInUser", email);
          window.location.replace("/home");
        } else {
          alert("Incorrect password");
        }
      } else {
        alert("No account found with this email");
      }
    }
  };

  return (
    <div className="auth-page">
      <img src={auth_img} id="auth-img" />
      <div className="auth-container">
        <h2 id="auth-title">
          {isLogin ? "Log into Photoverse" : "Create Your Account"}
        </h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div>
              <p className="input-title">USERNAME</p>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          )}
          <p className="input-title">EMAIL ADDRESS</p>
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p className="input-title">PASSWORD</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit" className="auth-button">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button onClick={handleToggle} className="toggle-button">
          {isLogin ? "Need an account? Sign Up" : "Have an account? Log in"}
        </button>
      </div>
    </div>
  );
}

export default Authentication;
