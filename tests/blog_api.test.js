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

  afterAll(() => {
    mongoose.connection.close();
  });
});
