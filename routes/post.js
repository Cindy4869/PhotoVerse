const express = require("express");
const PostData = require("../models/PostData"); // Import the Post model
const multer = require("multer");

const upload = multer({ dest: "uploads/" }); // Save files to `uploads/` directory

module.exports = function (router) {
  // Route for all posts
  const postsRoute = router.route("/posts");
  // Route for a specific post by ID
  const postsIdRoute = router.route("/posts/:id");

  /**
   * POST /api/posts - Create a new post
   */
  postsRoute.post(upload.single("img_reference"), async (req, res) => {
    try {
      const { post_id, author_id, content, post_type, price, style } = req.body;
      const img_reference = req.file ? req.file.filename : undefined; // Handle uploaded file

      // Validate required fields
      if (
        !post_id ||
        !author_id ||
        !content ||
        post_type === undefined ||
        !price
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Create new post object
      const newPost = new PostData({
        post_id,
        author_id,
        content,
        img_reference,
        post_type,
        price,
        style,
      });

      // Save to database
      await newPost.save();
      res
        .status(201)
        .json({ message: "Post created successfully", post: newPost });
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * GET /api/posts - Get all posts
   */
  postsRoute.get(async (req, res) => {
    try {
      const posts = await PostData.find();
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * GET /api/posts - Get all posts by author_id
   */
  postsRoute.get(async (req, res) => {
    try {
      const posts = await PostData.find({ author_id: req.params.author_id });
      res.status(200).json(posts);
    } catch (error) {
      console.error("Error retrieving posts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * GET /api/posts/:id - Get a specific post by ID
   */
  postsIdRoute.get(async (req, res) => {
    try {
      const post = await PostData.findOne({ post_id: req.params.id });
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.status(200).json(post);
    } catch (error) {
      console.error("Error retrieving post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * PUT /api/posts/:id - Update a specific post by ID
   */
  postsIdRoute.put(async (req, res) => {
    try {
      const updatedPost = await PostData.findOneAndUpdate(
        { post_id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      res
        .status(200)
        .json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
      console.error("Error updating post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  /**
   * DELETE /api/posts/:id - Delete a specific post by ID
   */
  postsIdRoute.delete(async (req, res) => {
    try {
      const deletedPost = await PostData.findOneAndDelete({
        post_id: req.params.id,
      });

      if (!deletedPost) {
        return res.status(404).json({ error: "Post not found" });
      }

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return router;
};
