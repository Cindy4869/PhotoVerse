const express = require("express");
const router = express.Router();
const PostData = require("../models/PostData"); // Import the Post model

const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Save files to `uploads/` directory

router.post("/", upload.single("img_reference"), async (req, res) => {
  try {
    const { post_id, author_id, content } = req.body;
    const img_reference = req.file ? req.file.filename : undefined; // Handle uploaded file

    if (!post_id || !author_id || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newPost = new PostData({
      post_id,
      author_id,
      content,
      img_reference,
    });
    console.log("New Post Object:", newPost);
    await newPost.save();
    res
      .status(201)
      .json({ message: "Post created successfully", post: newPost });
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
