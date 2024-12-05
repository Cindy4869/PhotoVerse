import React, { useState, useEffect } from 'react';
import './authentication.css';
import './landing.css';
import './home.css';
import './modal.css';
import landing_img from '../imgs/landing-pic.jpg';
import auth_img from '../imgs/auth-pic.jpg';

function Authentication() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
  
    const handleToggle = () => {
      setIsLogin(!isLogin);
    };
  
    const handleSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      if (!isLogin && password !== confirmPassword) {
        alert("Passwords don't match");
        return;
      }
      // Store user data in localStorage for simplicity
      if (!isLogin) {
        localStorage.setItem(email, JSON.stringify({ username, email, password }));
        localStorage.setItem('loggedInUser', email);
        alert('Account created successfully!');
        window.location.replace('/home');
      } else {
        const userData = localStorage.getItem(email);
        if (userData) {
          const parsedData = JSON.parse(userData);
          if (parsedData.password === password) {
            localStorage.setItem('loggedInUser', email);
            window.location.replace('/home');
          } else {
            alert('Incorrect password');
          }
        } else {
          alert('No account found with this email');
        }
      }
    };
  
    return (
      <div className="auth-page">
        <img src={auth_img} id="auth-img"/>
        <div className='auth-container'>
          <h2 id="auth-title">{isLogin ? 'Log into Photoverse' : 'Create Your Account'}</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (<div>
              <p className='input-title'>USERNAME</p>
              <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              />
            </div>
            )}
            <p className='input-title'>EMAIL ADDRESS</p>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <p className='input-title'>PASSWORD</p>
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
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <button onClick={handleToggle} className="toggle-button">
            {isLogin ? 'Need an account? Sign Up' : 'Have an account? Log in'}
          </button>
        </div>
      </div>
    );
  }
  
  function LandingPage({ onLoginClick, onSignUpClick }: { onLoginClick: () => void; onSignUpClick: () => void }) {
    return (
      <div className="landing-page">
        <img src={landing_img} id="landing-img"/>
        <div className='landing-text'>
          <h2 id = "landing-title-one">Welcome to</h2>
          <h1 id = "landing-title-two">Photoverse</h1>
          <p>Connecting photographers with clients seamlessly.</p>
        </div>
        <div className='landing-buttons'>
          <button onClick={onLoginClick} className="landing-button">LOG IN</button>
          <button onClick={onSignUpClick} className="landing-button">SIGN UP</button>
        </div>
      </div>
    );
  }
  
  function HomePage() {
    const [username, setUsername] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState([
      { id: 1, title: 'Portrait Session', author: 'John Doe', image: 'https://via.placeholder.com/150', description: 'A beautiful portrait session.' },
      { id: 2, title: 'Wedding Photography', author: 'Jane Smith', image: 'https://via.placeholder.com/150', description: 'Capturing your special day.' },
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
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser) || '{}');
        if (userData.username) {
          setUsername(userData.username);
        }
      } else {
        window.location.replace('/');
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
  
    const filteredPosts = posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    return (
      <div className="home-container">
        <header className="home-header">
          <h1 className="logo" onClick={() => window.location.href = '/home'}>PHOTOVERSE</h1>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <div className="user-info" onClick={() => window.location.href = '/profile'}>
            {username}
          </div>
        </header>
        <div className="post-grid">
          {filteredPosts.map(post => (
            <div key={post.id} className="post-card" onClick={() => handlePostClick(post)}>
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
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-button" onClick={handleCloseModal}>X</button>
              <h2>{selectedPost.title}</h2>
              <img src={selectedPost.image} alt={selectedPost.title} className="modal-image" />
              <p><strong>Author:</strong> {selectedPost.author}</p>
              <p><strong>Description:</strong> {selectedPost.description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  function UserPage() {
    const [username, setUsername] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    useEffect(() => {
      const loggedInUser = localStorage.getItem('loggedInUser');
      if (loggedInUser) {
        const userData = JSON.parse(localStorage.getItem(loggedInUser) || '{}');
        if (userData.username) {
          setUsername(userData.username);
        }
      } else {
        window.location.replace('/');
      }
    }, []);
  
    const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
      setSearchQuery(e.target.value);
    };
  
    const handleLogout = () => {
      localStorage.removeItem('loggedInUser');
      window.location.replace('/');
    };
  
    return (
      <div className="user-container">
        <header className="user-header">
          <h1 className="logo" onClick={() => window.location.href = '/home'}>PHOTOVERSE</h1>
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          <div className="user-info">
            {username}
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        </header>
        <div className="profile-content">
          <h2>{username}'s Profile</h2>
          {/* Add more profile-related content here */}
        </div>
      </div>
    );
  }
  
  export { Authentication, LandingPage, HomePage, UserPage };