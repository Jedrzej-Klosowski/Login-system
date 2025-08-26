const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password : { type: String, required: true },
  /*age : { type: Number, min: 16 },
  lastLogin: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  profilePicture: { type: String, default: 'default.jpg' },
  bio: { type: String, maxlength: 500 },
  */
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
