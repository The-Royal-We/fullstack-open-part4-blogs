require("express-async-errors");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const blogRoute = require("./controllers/blog");
const userRoute = require("./controllers/user");
const loginRoute = require("./controllers/login");
const { MONGODB_URI } = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const app = express();

logger.info("Connecting to mongoDB");

mongoose
  .connect(MONGODB_URI)
  .then(() => logger.info("Connection success"))
  .catch((err) => logger.error("Error when connecting to mongo ", err));

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogRoute);
app.use("/api/users", userRoute);
app.use("/api/login", loginRoute);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
