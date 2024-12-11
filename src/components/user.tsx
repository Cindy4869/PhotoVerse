import React, { useEffect, useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./user.css";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

type UserData = {
  user_id: number;
  username: string;
  email: string;
};

function UserPage() {
  const { userId, setUserId } = useUser(); // UseParams for cleaner routing
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userPosts, setUserPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/auth/user/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserData(data.user);
        } else {
          console.error("Failed to fetch user details");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/posts/author/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          setUserPosts(data);
        } else {
          console.error("Failed to fetch user posts");
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (userId) {
      fetchUserData();
      fetchUserPosts();
    }
  }, [userId]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = () => {
    setUserId(null);
    window.location.replace("/");
  };

  const filteredPosts = userPosts.filter((post: any) =>
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-page">
      <header className="user-header">
        <h1 className="logo" onClick={() => navigate(`/home?userId=${userId}`)}>
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
          {userData && (
            <>
              <h2>{userData.username}</h2>
              <p>Email: {userData.email}</p>
              <p>User ID: {userData.user_id}</p>
            </>
          )}
          <button
            className="create-post"
            onClick={() => (window.location.href = `/create?userId=${userId}`)}
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
