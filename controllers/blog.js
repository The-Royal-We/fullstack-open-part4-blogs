const blogRoute = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogRoute.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRoute.post("/", async (request, response) => {
  const { title, url, author, likes, _id } = request.body;
  if (!title) {
    return response
      .status(400)
      .json({ error: "Title is missing from request" });
  }
  if (!url) {
    return response.status(400).json({ error: "URL is missing from request" });
  }

  const users = await User.find({});
  const user = users[0];
  const blogToCreate = {
    title,
    url,
    likes,
    author,
    _id,
    user: user.id,
  };

  const blog = new Blog(blogToCreate);

  const newBlog = await blog.save();
  response.status(201).json(newBlog);

  return null;
});

blogRoute.put("/:id", async (request, response) => {
  const { title, author, url, likes } = request.body;
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    {
      title,
      author,
      url,
      likes,
    },
    { new: true }
  );
  response.status(200).json(updatedBlog);
});

blogRoute.delete("/:id", async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

module.exports = blogRoute;
