const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
