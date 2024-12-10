const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment_id: { type: Number, unique: true, required: true },
  post_id: { type: Number, required: true },
  author_id: { type: Number, required: true },
  content: { type: String, required: true },
  creation_time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
