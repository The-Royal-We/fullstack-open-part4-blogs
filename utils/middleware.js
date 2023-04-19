const jwt = require("jsonwebtoken");
const User = require("../models/user");

const logger = require("./logger");

const getAuthToken = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }
  if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);

  return null;
};

const tokenExtractor = (request, _response, next) => {
  request.token = getAuthToken(request);
  next();
};

const userExtractor = async (request, response, next) => {
  const { id: userId } = jwt.verify(request.token, process.env.SECRET);
  if (!userId) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(userId);
  request.user = user;
  return next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
