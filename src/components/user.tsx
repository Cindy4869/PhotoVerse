import React, { useEffect, useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./user.css";

function UserPage() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [userId, setUserId] = useState<number | null>(null);
  const [userPosts, setUserPosts] = useState([]);

  //   useEffect(() => {
  //     // Retrieve logged-in user from localStorage
  //     const loggedInUser = localStorage.getItem("loggedInUser");
  //     if (loggedInUser) {
  //       const userData = JSON.parse(localStorage.getItem(loggedInUser) || "{}");
  //       if (userData.username && userData.userId) {
  //         setUsername(userData.username);
  //         setUserId(userData.userId); // Assuming `userId` is stored in localStorage
  //       }
  //     } else {
  //       window.location.replace("/");
  //     }
  //   }, []);

  useEffect(() => {
    // Fetch posts created by the logged-in user
    fetch("http://localhost:4000/api/posts?author_id=1")
      .then((response) => response.json())
      .then((data) => {
        setUserPosts(data); // Assuming API returns an array of posts
      })
      .catch((error) => console.error("Error fetching user posts:", error));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    window.location.replace("/");
  };

  const filteredPosts = userPosts.filter((post: any) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-page">
      <header className="user-header">
        <h1 className="logo" onClick={() => (window.location.href = "/home")}>
          PHOTOVERSE
        </h1>
        <div className="search-bar">
          <img src={search_icon} className="search-icon" alt="Search" />
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
          <img src={user_icon} className="profile-pic" alt="User profile" />
          {/* <h2>{username}</h2>
          <p>Put personal description here</p> */}
          <h2>Author ID: 1</h2>
          <p>Posts created by user with ID 1</p>
          <button
            className="create-post"
            onClick={() => (window.location.href = "/create")}
          >
            CREATE POST
          </button>
        </div>
        <div className="user-post-container">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post: any) => (
              <div key={post.post_id} className="user-post-card">
                <img
                  src={`http://localhost:4000/uploads/${post.img_reference}`}
                  alt={post.content}
                  className="user-post-image"
                />
                <div className="user-post-details">
                  <p>{post.content}</p>
                  <p>Price: ${post.price}</p>
                  <p>
                    Type: {post.post_type === 0 ? "Photographer" : "Client"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPage;
