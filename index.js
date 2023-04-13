const blogsApp = require("./app");
const logger = require("./utils/logger");
const { PORT } = require("./utils/config");

blogsApp.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
