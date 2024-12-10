import { useState } from "react";
import "./authentication.css";
import auth_img from "../imgs/auth-pic.jpg";

function Authentication() {

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New field
  const [username, setUsername] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent page reload
    setError("");

    // Validate passwords during registration
    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const body = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (response.ok) {
        if (isLogin) {
          // Redirect after successful login
          window.location.href = `/dashboard?userId=${data.user.user_id}`; // Adjust route
        } else {
          alert("Registration successful! Please log in.");
          setIsLogin(true);
        }
      } else {
        setError(data.error || "An error occurred.");
      }
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the server. Please try again later.");
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
