const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require("supertest");
const helper = require("./testHelpers");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

describe("Blog Api Tests", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.listWithManyBlogs.map((blog) => new Blog(blog));
    const promiseArray = blogObjects.map((blog) => blog.save());
    await Promise.all(promiseArray);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.listWithManyBlogs.length);
  });

  test("blogs returned all contain the id field", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });

  test("a blog can be added", async () => {
    await api
      .post("/api/blogs")
      .send(helper.mockSingleBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length + 1);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).toContain("TestBlog");
  });

  test("a blog with missing likes will be saved with likes eq 0", async () => {
    const { likes, ...blogWithoutLikes } = helper.mockSingleBlog;

    const response = await api
      .post("/api/blogs")
      .send(blogWithoutLikes)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("a blog with missing title return a 400 and not be added to db", async () => {
    const { title, ...blogWithoutTitle } = helper.mockSingleBlog;

    await api.post("/api/blogs").send(blogWithoutTitle).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
