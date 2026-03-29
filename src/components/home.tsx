import React, { useContext, useEffect, useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./home.css";
import "./modal.css";
import { useUser } from "../context/UserContext";
// import { time } from "console";
import { useLocation } from "react-router-dom";



function HomePage() {
  // const { userId, setUserId } = useUser();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState(2);
  const [sortDate, setSortDate] = useState<"newest" | "oldest">("newest");
  const [filterPrice, setFilterPrice] = useState("All");
  const [filterStyle, setFilterStyle] = useState("All");
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const location = useLocation();

  // Parse the query string
  const params = new URLSearchParams(location.search);
  const userId = params.get("userId");
  
  type Post = {
    post_id: number;
    author_id: number;
    content: string;
    img_reference?: string;
    creation_time: string;
    post_type: number;
    price: number;
    style?: string;
    contact_info: string;
  };

  useEffect(() => {
    
    // if (!user) {
    //   
    //   window.location.replace("/au");
      
      
    // }
    // Fetch posts from backend
    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/posts?author_id=${userId}`);
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
  }, [userId]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  
  
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 2 || post.post_type === selectedType;
    var matchesPrice = true;
    if (filterPrice === "Low") {
      matchesPrice = post.price < 100;
    } else if (filterPrice === "Medium") {
      matchesPrice = post.price < 150 && post.price >= 100;
    } else if (filterPrice === "High") {
      matchesPrice = post.price > 150;
    }
    const matchesStyle = filterStyle === "All" || post.style === filterStyle;
    return matchesSearch && matchesType && matchesPrice && matchesStyle;
  }).sort((a,b)=>{
    const dateA = new Date(a.creation_time).getTime();
    const dateB = new Date(b.creation_time).getTime();

    return sortDate === "newest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="logo" onClick={() => (window.location.href = `/home?userId=${userId}`)}>
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
          onClick={() => (window.location.href = `/profile?userId=${userId}`)}
        />
      </header>
      <div className="filters">
        <div className="filter-top-row">
          <button className="sort-button" onClick={() => setSortDate("newest")}>Newest</button>
          <button className="sort-button" onClick={() => setSortDate("oldest")}>Oldest</button>
        </div>
        <div className="filter-bottom-row">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(parseInt(e.target.value, 10))}
            className="filter-dropdown"
          >
            <option value="2">Posts from all users</option>
            <option value="0">Offerings from photographers</option>
            <option value="1">Commissions from clients</option>
          </select>
          <select
            value={filterPrice}
            onChange={(e) => setFilterPrice(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All">Price-Range: All</option>
            <option value="Low">Below $100</option>
            <option value="Medium">$100-$150</option>
            <option value="High">$150+</option>
          </select>
          <select
            value={filterStyle}
            onChange={(e) => setFilterStyle(e.target.value)}
            className="filter-dropdown"
          >
            <option value="All">All Styles</option>
            <option value="Portrait">Portrait</option>
            <option value="Pet">Pet</option>
            <option value="Nature">Nature</option>
            <option value="Event">Event</option>
          </select>
        </div>
      </div>
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
              <p id="post-content">Contact Info: {selectedPost.contact_info}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
