require("dotenv").config();
const blogsApp = require("./app");

const PORT = 3003;
blogsApp.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
