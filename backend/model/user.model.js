const mongoose = require('mongoose');
const Schema = mongoose.Schema; // db schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
}, {
  timestamps: true,
})

const User = mongoose.model('User', userSchema); // class with the document is created

module.exports = User;