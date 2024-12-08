import React, { useEffect, useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./user.css";

function UserPage() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(localStorage.getItem(loggedInUser) || "{}");
      if (userData.username) {
        setUsername(userData.username);
      }
    } else {
      window.location.replace("/");
    }
  }, []);

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.replace("/");
  };

  return (
    <div className="user-page">
      <header className="user-header">
        <h1 className="logo" onClick={() => (window.location.href = "/home")}>
          PHOTOVERSE
        </h1>
        <div className="search-bar">
          <img src={search_icon} className="search-icon" />
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <p className="logout-button" onClick={handleLogout}>
          LOG OUT
        </p>
      </header>
      <div className="user-profile-container">
        <div className="profile">
          <img src={user_icon} className="profile-pic" />
          <h2>{username}</h2>
          <p>Put personal description here</p>
          <button
            className="create-post"
            onClick={() => (window.location.href = "/create")}
          >
            CREATE POST
          </button>
        </div>
        <div className="user-post-container">{/* user posts here */}</div>
      </div>
    </div>
  );
}

export default UserPage;
