// db_get.js
const Post = require('../models/Post');
const User = require('../models/User');
const Comment = require('../models/Comment');
const Like = require('../models/Like');

async function getPostById(postId) {
  try {
    const post = await Post.findOne({ post_id: postId });
    return post;
  } catch (error) {
    console.error(`Error fetching post with ID ${postId}:`, error);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findOne({ user_id: userId });
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
    throw error;
  }
}

async function getCommentById(commentId) {
  try {
    const comment = await Comment.findOne({ comment_id: commentId });
    return comment;
  } catch (error) {
    console.error(`Error fetching comment with ID ${commentId}:`, error);
    throw error;
  }
}

async function getLikeById(likeId) {
  try {
    const like = await Like.findOne({ like_id: likeId });
    return like;
  } catch (error) {
    console.error(`Error fetching like with ID ${likeId}:`, error);
    throw error;
  }
}

module.exports = {
  getPostById,
  getUserById,
  getCommentById,
  getLikeById
};
