import { useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./create.css";

function CreatePost() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchQuery(e.target.value);
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("post_id", String(Math.floor(Math.random() * 100000))); // Convert number to string
    formData.append("author_id", "1"); // Replace with dynamic user ID
    formData.append("content", description);
    if (image) formData.append("img_reference", image);

    try {
      const response = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Post created successfully!");
        console.log(data);
        // window.location.href = "/home";
      } else {
        const errorData = await response.json();
        alert("Error creating post: " + errorData.error);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="create-page">
      <header className="create-header">
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
        <img
          src={user_icon}
          className="user-icon"
          onClick={() => (window.location.href = "/profile")}
          alt="User profile"
        />
      </header>
      <form className="form-container" onSubmit={handleCreatePost}>
        <input
          className="text-field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="text-field"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="create-post">
          Post
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
