import { useContext, useState } from "react";
import search_icon from "../imgs/magnifying-glass.png";
import user_icon from "../imgs/profile-user.png";
import "./create.css";
import { useUser } from "../context/UserContext";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  // const { userId, setUserId } = useUser();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [postType, setPostType] = useState<number>(0); // Default: photographer
  const [price, setPrice] = useState<number>(0);
  const [style, setStyle] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useUser();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    formData.append("post_id", String(Math.floor(Math.random() * 100000))); // Generate random post_id
    if (userId) {
      formData.append("author_id", userId);
    } else {
      console.error("userId is null.");
    } // Replace with dynamic user ID
    formData.append("content", description);
    formData.append("post_type", String(postType)); // Convert number to string
    formData.append("price", String(price)); // Convert number to string
    if (style) formData.append("style", style); // Optional
    if (image) formData.append("img_reference", image);
    if (contactInfo) formData.append("contact_info", contactInfo);

    try {
      const response = await fetch("http://localhost:4000/api/posts", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert("Post created successfully!");
        console.log(data);
        // Redirect or clear the form if needed
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
        <img
          src={user_icon}
          className="user-icon"
          onClick={() => (window.location.href = `/profile?userId=${userId}`)}
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
        <input
          className="text-field"
          type="text"
          placeholder="Contact Information"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
        />
        <input
          className="text-field"
          type="text"
          placeholder="Style (optional)"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="postType"
              value={0}
              checked={postType === 0}
              onChange={(e) => setPostType(Number(e.target.value))}
            />
            Photographer
          </label>
          <label>
            <input
              type="radio"
              name="postType"
              value={1}
              checked={postType === 1}
              onChange={(e) => setPostType(Number(e.target.value))}
            />
            Client
          </label>
        </div>

        <input
          className="text-field"
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
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
