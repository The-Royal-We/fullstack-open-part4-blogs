const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const helper = require("./testHelpers");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await helper.initialiseUsers();
  });

  afterAll(async () => {
    // holy moly don't forget to close your connection
    await mongoose.connection.close();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "muser",
      name: "Mock User",
      password: "test123456789",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "root",
      password: "test123456789",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if username is invalid", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "root",
      password: "test123456789",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("creation fails with proper statuscode and message if password is invalid", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "newMockMan",
      name: "mockMan",
      password: "te",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  });

  test("we can get all users", async () => {
    const usersAtStart = await helper.usersInDb();

    const { body } = await api.get("/api/users");

    expect(body).toHaveLength(usersAtStart.length);
  });
});
