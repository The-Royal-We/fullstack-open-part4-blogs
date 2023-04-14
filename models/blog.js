const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (_document, { title, author, url, likes, _id }) => ({
    title,
    author,
    url,
    likes,
    id: _id.toString(),
  }),
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
