const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const blogRoute = require("./controllers/blog");

const app = express();

mongoose.connect(MONGODB_URI);
app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoute);

module.exports = app;
