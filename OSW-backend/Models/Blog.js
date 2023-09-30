const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user_author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  admin_author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  mediaUrl: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;
