import React, { useEffect, useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./home.css";
import "./modal.css";
import { UserContext } from "../context/UserContext";


function HomePage() {
  const [username, setUsername] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  type Post = {
    post_id: number;
    author_id: number;
    content: string;
    img_reference?: string;
    creation_time: string;
    post_type: number;
    price: number;
    style?: string;
  };

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

    // Fetch posts from backend
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/posts");
        if (response.ok) {
          const data: Post[] = await response.json();
          setPosts(data);
        } else {
          console.error("Failed to fetch posts");
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
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
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo" onClick={() => (window.location.href = "/home")}>
          PHOTOVERSE
        </h1>
        <div className="search-bar">
          <img src={search_icon} className="search-icon" alt="search" />
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
          alt="User profile"
          className="user-icon"
          onClick={() => (window.location.href = "/profile")}
        />
      </header>
      <div className="post-container">
        {filteredPosts.map((post) => (
          <div
            key={post.post_id}
            className="post-card"
            onClick={() => handlePostClick(post)}
          >
            <img
              src={post.img_reference || "https://via.placeholder.com/150"}
              alt={post.content}
              className="post-image"
            />
            <div className="post-details">
              <h3>{post.content}</h3>
              <p>by Author {post.author_id}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <img
              src={
                selectedPost.img_reference || "https://via.placeholder.com/150"
              }
              alt={selectedPost.content}
              className="modal-image"
            />
            <div className="modal-details">
              <div className="post-author">
                <img src={user_icon} id="author-pic" alt="Author profile" />
                <p>Author ID: {selectedPost.author_id}</p>
              </div>
              <h2>{selectedPost.content}</h2>
              <p id="post-content">Price: ${selectedPost.price}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
