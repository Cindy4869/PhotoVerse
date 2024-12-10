module.exports = function (router) {
  const User = require("../models/UserData");

  // Route for user registration
  const registerRoute = router.route("/auth/register");
  // Route for user login
  const loginRoute = router.route("/auth/login");
  // Route for fetching user information by ID
  const userIdRoute = router.route("/auth/user/:id");

  /**
   * POST /api/auth/register - Register a new user
   */
  registerRoute.post(async (req, res) => {
    try {
      const { username, email, password } = req.body;

      if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Generate a unique user ID
      const user_id = Math.floor(Math.random() * 1000000);

      // Check for duplicate username or email
      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Username or email already exists" });
      }

      // Create and save the new user
      const newUser = new User({ user_id, username, email, password });
      await newUser.save();

      res.status(201).json({
        message: "User registered successfully",
        user: newUser,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * POST /api/auth/login - User login
   */
  loginRoute.post(async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
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

      res.status(200).json({
        message: "Login successful",
        user,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * GET /api/auth/user/:id - Get user information by ID
   */
  userIdRoute.get(async (req, res) => {
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

  return router;
};
