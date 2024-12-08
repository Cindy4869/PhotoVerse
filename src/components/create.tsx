import { useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./create.css";

function CreatePost() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="create-page">
      <header className="create-header">
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
      <form className="form-container">
        <input className="text-field" type="text" placeholder="Title" />
        <textarea className="text-field" placeholder="Description" />
        <input type="file" />
        <button className="create-post">Post</button>
      </form>
    </div>
  );
}

export default CreatePost;
