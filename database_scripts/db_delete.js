const { connectDB } = require('./db_connect');

async function deleteUser(user_id) {
  const db = await connectDB();
  const result = await db.collection("Users").deleteOne({ user_id: user_id });
  return result.deletedCount;
}

async function deletePost(post_id) {
  const db = await connectDB();
  const result = await db.collection("Posts").deleteOne({ post_id: post_id });
  return result.deletedCount;
}

async function deleteComment(comment_id) {
  const db = await connectDB();
  const result = await db.collection("Comments").deleteOne({ comment_id: comment_id });
  return result.deletedCount;
}

async function deleteLike(like_id) {
  const db = await connectDB();
  const result = await db.collection("Likes").deleteOne({ like_id: like_id });
  return result.deletedCount;
}

module.exports = {
  deleteUser,
  deletePost,
  deleteComment,
  deleteLike
};
