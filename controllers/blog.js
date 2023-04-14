const blogRoute = require("express").Router();
const Blog = require("../models/blog");

blogRoute.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRoute.post("/", async (request, response) => {
  const { body } = request;
  if (!body.title) {
    return response
      .status(400)
      .json({ error: "Title is missing from request" });
  }
  if (!body.url) {
    return response.status(400).json({ error: "URL is missing from request" });
  }
  const blog = new Blog(request.body);
  const newBlog = await blog.save();
  response.status(201).json(newBlog);

  return null;
});

module.exports = blogRoute;
