import React, { useEffect, useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./home.css";
import "./modal.css";

function HomePage() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Portrait Session",
      author: "John Doe",
      image: "https://via.placeholder.com/150",
      description: "A beautiful portrait session.",
    },
    {
      id: 2,
      title: "Wedding Photography",
      author: "Jane Smith",
      image: "https://via.placeholder.com/150",
      description: "Capturing your special day.",
    },
    // Add more sample posts here
  ]);
  type Post = {
    id: number;
    title: string;
    author: string;
    image: string;
    description: string;
  };

  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="home-header">
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
        <img
          src={user_icon}
          className="user-icon"
          onClick={() => (window.location.href = "/profile")}
        />
      </header>
      <div className="post-container">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="post-card"
            onClick={() => handlePostClick(post)}
          >
            <img src={post.image} alt={post.title} className="post-image" />
            <div className="post-details">
              <h3>{post.title}</h3>
              <p>by {post.author}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            {/* <button className="close-button" onClick={handleCloseModal}>X</button> */}
            <img
              src={selectedPost.image}
              alt={selectedPost.title}
              className="modal-image"
            />
            <div className="modal-details">
              <div className="post-author">
                <img src={user_icon} id="author-pic" />{" "}
                {/* replace with user's own profile pic if we have one*/}
                <p>{selectedPost.author}</p>
              </div>
              <h2>{selectedPost.title}</h2>
              <p id="post-content">{selectedPost.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
