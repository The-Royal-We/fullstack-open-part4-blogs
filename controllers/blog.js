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
