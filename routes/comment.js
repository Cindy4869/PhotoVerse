const express = require('express');
const router = express.Router();
const Comment = require('../models/CommentData');

// Get all comments for a specific post
router.get('/:postId/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
});

// Add a new comment
router.post('/:postId/comments', async (req, res) => {
  try {
    const { author_id, content } = req.body;
    const newComment = new Comment({
      comment_id: Math.floor(Math.random() * 100000), // Replace with your ID generator logic
      post_id: req.params.postId,
      author_id,
      content,
    });
    await newComment.save();
    res.json(newComment);
  } catch (err) {
    res.status(500).json({ error: "Error saving comment" });
  }
});

module.exports = router;