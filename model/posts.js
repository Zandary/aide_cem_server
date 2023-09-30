const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  corps: String,
  images: [String],
  redacteur: String,
  createdAt: { type: Date, default: Date.now },
  commentary: [String]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
