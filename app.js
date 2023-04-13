const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { MONGODB_URI } = require("./utils/config");
const blogRoute = require("./controllers/blog");

const app = express();

mongoose.connect(MONGODB_URI);
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoute);

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
