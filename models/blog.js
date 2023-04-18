const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

blogSchema.set("toJSON", {
  transform: (_document, { title, author, url, likes, user, _id }) => ({
    title,
    author,
    url,
    likes,
    id: _id.toString(),
    user,
  }),
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
