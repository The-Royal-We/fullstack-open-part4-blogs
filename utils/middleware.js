const logger = require("./logger");

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

module.exports = { unknownEndpoint, errorHandler };