const {
  favoriteBlog,
  dummy,
  totalLikes,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");
const { listWithOneBlog, listWithManyBlogs } = require("./testHelpers");

describe("dummy unit tests", () => {
  test("dummy returns one", () => {
    const blogs = [];

    const result = dummy(blogs);
    expect(result).toBe(1);
  });
});

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

describe("mostBlogs unit tests", () => {
  test("when list is null, then return 0", () => {
    const result = mostBlogs(null);
    expect(result).toBe(null);
  });

  test("when list has no blogs, then return 0", () => {
    const result = mostBlogs([]);
    expect(result).toBe(null);
  });

  test("when list only has one blog, then return author with 1 blog", () => {
    const result = mostBlogs(listWithOneBlog);
    expect(result).toStrictEqual({
      author: "Edsger W. Dijkstra",
      blogs: 1,
    });
  });
  test("when list has many blog, then return author with most blogs", () => {
    const result = mostBlogs(listWithManyBlogs);
    expect(result).toStrictEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});
describe("mostLikes unit tests", () => {
  test("when list is null, then return 0", () => {
    const result = mostLikes(null);
    expect(result).toBe(null);
  });

  test("when list has no blogs, then return 0", () => {
    const result = mostLikes([]);
    expect(result).toBe(null);
  });

  test("when list only has one blog, then return author with most likes", () => {
    const result = mostLikes(listWithOneBlog);
    expect(result).toStrictEqual({
      author: "Edsger W. Dijkstra",
      likes: 5,
    });
  });
  test("when list has many blog, then return author with most likes", () => {
    const result = mostLikes(listWithManyBlogs);
    expect(result).toStrictEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});
