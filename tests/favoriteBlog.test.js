const { favoriteBlog } = require("../utils/list_helper");

describe("favoriteBlog unit tests", () => {
  test("when list is null then return empty list", () => {
    const result = favoriteBlog(null);
    expect(result).toStrictEqual([]);
  });
});
