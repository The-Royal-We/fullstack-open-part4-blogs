const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("../app");
const User = require("../models/user");

describe("Login Router", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("s3€r3t", 10);
    const user = new User({
      username: "mockUser",
      name: "Mock User",
      passwordHash,
    });
    await user.save();
  });

  describe("POST /", () => {
    test("should return a token for a valid login", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ username: "mockUser", password: "s3€r3t" })
        .expect(200)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveProperty("token");
      expect(response.body).toHaveProperty("username", "mockUser");
      expect(response.body).toHaveProperty("name", "Mock User");
    });

    test("should return 401 for an invalid username", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ username: "nonexistentuser", password: "s3€r3t" })
        .expect(401)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveProperty(
        "error",
        "invalid username or password"
      );
    });

    test("should return 401 for an invalid password", async () => {
      const response = await request(app)
        .post("/api/login")
        .send({ username: "mockUser", password: "wrongpassword" })
        .expect(401)
        .expect("Content-Type", /application\/json/);

      expect(response.body).toHaveProperty(
        "error",
        "invalid username or password"
      );
    });

    test("should return 400 for missing username or password", async () => {
      const responseMissingPassword = await request(app)
        .post("/api/login")
        .send({ username: "mockUser" })
        .expect(400)
        .expect("Content-Type", /application\/json/);

      const responseMissingUsername = await request(app)
        .post("/api/login")
        .send({ password: "s3€r3t" })
        .expect(400)
        .expect("Content-Type", /application\/json/);

      expect(responseMissingPassword.body).toHaveProperty(
        "error",
        "username and password are required"
      );
      expect(responseMissingUsername.body).toHaveProperty(
        "error",
        "username and password are required"
      );
    });
  });
});
