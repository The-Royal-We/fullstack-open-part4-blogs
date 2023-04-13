const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoute = require("./controllers/blog");
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");

const app = express();

logger.info("Connecting to mongoDB");

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("Connection success"))
  .catch((err) => logger.error("Error when connecting to mongo ", err));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoute);

module.exports = app;