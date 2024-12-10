
const { connectDB } = require('./db_connect');
const User = require('../models/UserData');
const Post = require('../models/PostData');
const Comment = require('../models/CommentData');
const Like = require('../models/LikeData');

async function insertUser(user) {
  await connectDB();
  const newUser = new User(user);
  const savedUser = await newUser.save();
  return savedUser._id;
}

async function insertPost(post) {
  await connectDB();
  const newPost = new Post(post);
  const savedPost = await newPost.save();
  return savedPost._id;
}

async function insertComment(comment) {
  await connectDB();
  const newComment = new Comment(comment);
  const savedComment = await newComment.save();
  return savedComment._id;
}

async function insertLike(like) {
  await connectDB();
  const newLike = new Like(like);
  const savedLike = await newLike.save();
  return savedLike._id;
}

module.exports = {
  insertUser,
  insertPost,
  insertComment,
  insertLike
};
