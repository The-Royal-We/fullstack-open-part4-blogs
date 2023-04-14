const blogRoute = require("express").Router();
const Blog = require("../models/blog");

blogRoute.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRoute.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = blogRoute;
