const blogRoute = require("express").Router();
const Blog = require("../models/blog");

blogRoute.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

module.exports = blogRoute;
