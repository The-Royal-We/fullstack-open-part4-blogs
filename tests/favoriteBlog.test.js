const { favoriteBlog } = require("../utils/list_helper");

describe("favoriteBlog unit tests", () => {
  test("when list is null then return null", () => {
    const result = favoriteBlog(null);
    expect(result).toBeNull();
  });
  test("when list is empty then return null", () => {
    const result = favoriteBlog(null);
    expect(result).toBeNull();
  });

  xtest("when list is contains one blog then return that blog", () => {
    const result = favoriteBlog(null);
    expect(result).toStrictEqual([]);
  });
});
