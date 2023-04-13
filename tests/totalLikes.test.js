const { totalLikes } = require("../utils/list_helper");
const { listWithOneBlog, listWithManyBlogs } = require("./testHelpers");

describe("totalLikes unit tests", () => {
  test("when list is null, then return 0", () => {
    const result = totalLikes(null);
    expect(result).toBe(0);
  });

  test("when list has no blogs, then return 0", () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list only has one blog, then total likes eq likes of that blog", () => {
    const result = totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list only has many blogs, then total likes eq sum of all likes of all blogs", () => {
    const result = totalLikes(listWithManyBlogs);
    expect(result).toBe(36);
  });
});
