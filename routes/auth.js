module.exports = function (router) {
    const User = require("../models/UserData");
  
    // Function to generate a random user ID
    const generateRandomId = () => Math.floor(Math.random() * 1000000);
  
    // User Registration
    router.post("/auth/register", async (req, res) => {
      try {
        const { username, email, password } = req.body;
  
        if (!username || !email || !password) {
          return res.status(400).json({ error: "All fields are required" });
        }
  
        const user_id = generateRandomId();
  
        // Check for duplicate username or email
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
          return res.status(400).json({ error: "Username or email already exists" });
        }
  
        // Create and save the new user
        const newUser = new User({ user_id, username, email, password });
        await newUser.save();
  
        res.status(201).json({ message: "User registered successfully", user: newUser });
      } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  
    // User Login
    router.post("/auth/login", async (req, res) => {
      try {
        const { email, password } = req.body;
  
        if (!email || !password) {
          return res.status(400).json({ error: "Email and password are required" });
        }
  
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        // Validate password
        if (user.password !== password) {
          return res.status(401).json({ error: "Invalid credentials" });
        }
  
        res.status(200).json({ message: "Login successful", user });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  
    // Get User Information
    router.get("/auth/user/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const user = await User.findOne({ user_id: id });
  
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
  
        res.status(200).json({ user });
      } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  };