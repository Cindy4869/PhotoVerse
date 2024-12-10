
const { connectDB } = require('./db_connect');
const User = require('../models/UserData');
const Post = require('../models/PostData');
const Comment = require('../models/CommentData');
const Like = require('../models/LikeData');

async function deleteUser(user_id) {
  await connectDB();
  const result = await User.deleteOne({ user_id: user_id });
  return result.deletedCount;
}

async function deletePost(post_id) {
  await connectDB();
  const result = await Post.deleteOne({ post_id: post_id });
  return result.deletedCount;
}

async function deleteComment(comment_id) {
  await connectDB();
  const result = await Comment.deleteOne({ comment_id: comment_id });
  return result.deletedCount;
}

async function deleteLike(like_id) {
  await connectDB();
  const result = await Like.deleteOne({ like_id: like_id });
  return result.deletedCount;
}

module.exports = {
  deleteUser,
  deletePost,
  deleteComment,
  deleteLike
};
