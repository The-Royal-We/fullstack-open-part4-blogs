const { favoriteBlog } = require("../utils/list_helper");
const { listWithOneBlog, listWithManyBlogs } = require("./testHelpers");

describe("favoriteBlog unit tests", () => {
  test("when list is null then return null", () => {
    const result = favoriteBlog(null);
    expect(result).toBeNull();
  });
  test("when list is empty then return null", () => {
    const result = favoriteBlog(null);
    expect(result).toBeNull();
  });

  test("when list contains one blog then return that blog", () => {
    const result = favoriteBlog(listWithOneBlog);
    expect(result).toBe(listWithOneBlog[0]);
  });

  test("when list contains many blogs then return blog with most likes", () => {
    const result = favoriteBlog(listWithManyBlogs);
    expect(result).toStrictEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});
