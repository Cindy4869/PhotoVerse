const mongoose = require('mongoose');
const { Schema } = mongoose;

const LikeSchema = new Schema({
  like_id: { type: Number, unique: true, required: true },
  post_id: { type: Number, required: true },
  user_id: { type: Number, required: true },
  creation_time: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Like', LikeSchema);
