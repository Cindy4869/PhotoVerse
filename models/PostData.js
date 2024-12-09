const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  post_id: { type: Number, unique: true, required: true },
  author_id: { type: Number, required: true },
  content: { type: String, required: true },
  img_reference: { type: String },
  creation_time: { type: Date, default: Date.now },
});
console.log("Database Name:", mongoose.connection.name);
module.exports = mongoose.model("Post", PostSchema);
