const mongoose = require("mongoose");
// eslint-disable-next-line import/no-extraneous-dependencies
const supertest = require("supertest");
const helper = require("./testHelpers");
const app = require("../app");

const api = supertest(app);

describe("Blog Api Tests", () => {
  let activeToken;
  beforeEach(async () => {
    await helper.initialiseData();
    const { body } = await api
      .post("/api/login")
      .send({ username: "root", password: "sekret" })
      .expect(200);
    activeToken = `Bearer ${body.token}`;
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(helper.listWithManyBlogs.length);
  });

  test("blogs returned all contain the id and user field", async () => {
    const response = await api.get("/api/blogs");
    response.body.forEach((blog) => expect(blog.id).toBeDefined());
    response.body.forEach((blog) => expect(blog.user).toBeDefined());
  });

  test("a blog can be added", async () => {
    await api
      .post("/api/blogs")
      .send(helper.mockSingleBlog)
      .set("Authorization", activeToken)
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
      .set("Authorization", activeToken)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test("a blog with missing title return a 400 and not be added to db", async () => {
    const { title, ...blogWithoutTitle } = helper.mockSingleBlog;

    await api
      .post("/api/blogs")
      .send(blogWithoutTitle)
      .set("Authorization", activeToken)
      .expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);
  });

  test("a blog cannot be entered without authenticating", async () => {
    const response = await api
      .post("/api/blogs")
      .send(helper.mockSingleBlog)
      .expect(401)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);

    const titles = blogsAtEnd.map((b) => b.title);
    expect(titles).not.toContain("TestBlog");

    expect(response.body).toHaveProperty("error", "invalid token");
  });

  test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", activeToken)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length - 1);

    const title = blogsAtEnd.map((r) => r.title);

    expect(title).not.toContain(blogToDelete.title);
  });

  test("a blog cannot be deleted with invalid auth", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];
    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401);

    expect(response.body).toHaveProperty("error", "invalid token");
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);
  });

  test("a blog can only be deleted by the same person that created it", async () => {
    const newMockUserUsername = "createNewBlog";
    const newMockUserPassword = "12345";

    // create new user
    await api
      .post("/api/users")
      .send({
        username: newMockUserUsername,
        name: "blogman",
        password: newMockUserPassword,
      })
      .expect(201);

    // login with new User
    const newUserLogin = await api
      .post("/api/login")
      .send({ username: newMockUserUsername, password: newMockUserPassword })
      .expect(200);

    const newUserToken = `Bearer ${newUserLogin.body.token}`;

    const oldUserToken = activeToken;
    // create blog with new user
    const {
      body: { id: blogToDeleteId },
    } = await api
      .post("/api/blogs")
      .send({
        title: "mockblog",
        author: "mockAuth",
        url: "https://mooogle.com",
        likes: 1,
      })
      .set("Authorization", newUserToken)
      .expect(201);

    const blogsWithNewInserted = await helper.blogsInDb();

    expect(blogsWithNewInserted).toHaveLength(
      helper.listWithManyBlogs.length + 1
    );

    // run delete with old user
    const responseWithIncorrectUser = await api
      .delete(`/api/blogs/${blogToDeleteId}`)
      .set("Authorization", oldUserToken)
      .expect(401);

    expect(responseWithIncorrectUser.body).toHaveProperty(
      "error",
      "unauthorized"
    );

    const blogsAfterDeletionAttemptWithIncorrectUser = await helper.blogsInDb();

    expect(blogsAfterDeletionAttemptWithIncorrectUser).toHaveLength(
      // No change expected
      blogsWithNewInserted.length
    );

    // run delete with new user
    await api
      .delete(`/api/blogs/${blogToDeleteId}`)
      .set("Authorization", newUserToken)
      .expect(204);
    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);
  });

  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const newBlog = {
      ...blogToUpdate,
      title: "Mock Title",
      author: "Mock Author",
    };

    const partialObjectMatch = expect.objectContaining({
      title: "Mock Title",
      author: "Mock Author",
    });

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.listWithManyBlogs.length);

    expect(blogsAtEnd).toContainEqual(partialObjectMatch);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
