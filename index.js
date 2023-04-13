const blogsApp = require("./app");
const { PORT } = require("./utils/config");

blogsApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
