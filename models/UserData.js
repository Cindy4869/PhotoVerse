const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  user_id: { type: Number, unique: true, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
