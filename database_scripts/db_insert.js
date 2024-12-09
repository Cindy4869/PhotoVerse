
const { connectDB } = require('./db_connect');

async function insertUser(user) {
  const db = await connectDB();
  const result = await db.collection("Users").insertOne(user);
  return result.insertedId;
}

async function insertPost(post) {
  const db = await connectDB();
  const result = await db.collection("Posts").insertOne(post);
  return result.insertedId;
}

async function insertComment(comment) {
  const db = await connectDB();
  const result = await db.collection("Comments").insertOne(comment);
  return result.insertedId;
}

async function insertLike(like) {
  const db = await connectDB();
  const result = await db.collection("Likes").insertOne(like);
  return result.insertedId;
}

module.exports = {
  insertUser,
  insertPost,
  insertComment,
  insertLike
};
