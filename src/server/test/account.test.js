import express from "express";
import request from "supertest";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { Pool } from "pg";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";

import authRouter from "../src/routes/auth.routes.js";
import AccountModel from "../src/models/account.model";
import AccountController from "../src/controllers/account.controller";

let server = null;
let pool = null;

dotenv.config();

// set up Jest mock for postgresql connection
jest.mock("pg", () => {
  const mPool = {
    query: jest.fn(),
  };
  return { Pool: jest.fn(() => mPool) };
});

// this should run before any tests
beforeAll(() => {
  app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use("/auth", authRouter);

  server = app.listen();
  pool = new Pool();
});

// this should run after each test
afterEach(async () => {
  jest.clearAllMocks();
  server.close();
});

describe("Account Model", () => {
  const accountModel = new AccountModel();

  // test ability to look up account with email
  describe("findByEmail()", () => {
    test("returns an empty array when results are not found", async () => {
      pool.query.mockResolvedValue({
        rows: [],
      });

      const findingEmail = await accountModel.findByEmail("test@example.com");

      expect(pool.query).toBeCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM account WHERE email = $1;", ["test@example.com"]);

      expect(findingEmail).toHaveLength(0);
    });

    test("returns the email when results are found", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            email: "test@example.com",
          },
        ],
      });

      const email = "test@example.com";

      const findingEmail = await accountModel.findByEmail(email);

      expect(pool.query).toBeCalledTimes(1);
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM account WHERE email = $1;", ["test@example.com"]);

      expect(findingEmail).toHaveLength(1);
      expect(findingEmail).toEqual(expect.arrayContaining([expect.objectContaining({ email: "test@example.com" })]));
    });
  });

  // test ability to create account
  describe("createAccount()", () => {
    test("throws error if email used is already found in the database", async () => {
      pool.query.mockResolvedValue({
        rows: [
          {
            email: "test@example.com",
            password: "test",
          },
        ],
      });

      const createAccount = await accountModel.createAccount("text@example.com");

      expect(createAccount.message).toBe("Email already exists");
    });

    test("successfully creates an account", async () => {
      pool.query.mockResolvedValue({
        rows: [],
      });

      let payload = {
        email: "test@example.com",
        password: "test",
      };

      await accountModel.createAccount(payload);

      // Database gets queried twice, once to check if the email exists and then to insert the new account
      expect(pool.query).toBeCalledTimes(2);
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM account WHERE email = $1;", ["test@example.com"]);
      expect(pool.query).toHaveBeenCalledWith("INSERT INTO account (email, password) VALUES ($1, $2);", [
        "test@example.com",
        "test",
      ]);
    });
  });
});

describe("Account Controller", () => {
  describe("signup()", () => {
    test("rejects missing email", async () => {
      let body = {
        password: "test",
      };

      const response = await request(app).post("/auth/signup").send(body);
      console.log(response.text);
      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(400);
      expect(response.text).toEqual("Missing email");
    });

    test("rejects missing password", async () => {
      let body = {
        email: "test@example.com",
      };

      const response = await request(app).post("/auth/signup").send(body);
      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(400);
      expect(response.text).toEqual("Missing password");
    });

    test("creates query for account and returns success", async () => {
      let body = {
        email: "test@example.com",
        password: "test",
      };

      const response = await request(app).post("/auth/signup").send(body);

      // The queries are not exactly necessary. They're already tested by the model tests.
      expect(pool.query).toBeCalledTimes(2);
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM account WHERE email = $1;", ["test@example.com"]);
      expect(pool.query).toHaveBeenCalledWith("INSERT INTO account (email, password) VALUES ($1, $2);", [
        "test@example.com",
        expect.anything(),
      ]);

      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(201);
      expect(response.text).toEqual("Account created successfully");
    });

    test("does not call database with same password value as passed in", async () => {
      let body = {
        email: "test@example.com",
        password: "test",
      };

      const response = await request(app).post("/auth/signup").send(body);

      expect(pool.query).toBeCalledTimes(2);
      expect(pool.query).toHaveBeenCalledWith("SELECT * FROM account WHERE email = $1;", ["test@example.com"]);
      expect(pool.query).not.toHaveBeenCalledWith("INSERT INTO account (email, password) VALUES ($1, $2);", [
        "test@example.com",
        "test",
      ]);

      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(201);
      expect(response.text).toEqual("Account created successfully");
    });

    test("The password is hashed before being inserted into the database", async () => {
      const accountController = new AccountController();
      jest.spyOn(accountController.account, "createAccount");

      const req = {
        body: {
          email: "test@example.com",
          password: "Test",
        },
      };
      const res = {
        send: jest.fn(),
      };
      await accountController.signUp(req, res, jest.fn());

      expect(accountController.account.createAccount).toHaveBeenCalled();
      expect(accountController.account.createAccount).toHaveBeenCalledWith({
        email: "test@example.com",
        password: expect.stringMatching(/^\$2b\$10\$.{53}$/),
      });
    });
  });

  describe("signin()", () => {
    test("rejects missing email", async () => {
      let body = {
        password: "test",
      };

      const response = await request(app).post("/auth/signin").send(body);
      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(400);
      expect(response.text).toEqual("Missing email");
    });

    test("rejects missing password", async () => {
      let body = {
        email: "test@example.com",
      };

      const response = await request(app).post("/auth/signin").send(body);
      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(400);
      expect(response.text).toEqual("Missing password");
    });

    test("returns error if password is incorrect", async () => {
      let body = {
        email: "test@example.com",
        password: "test",
      };

      pool.query.mockResolvedValue({
        rows: [
          {
            email: "test@example.com",
            password: "test",
          },
        ],
      });

      const response = await request(app).post("/auth/signin").send(body);
      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(403);
      expect(response.text).toEqual("Incorrect password");
    });

    test("successfully authenticates user", async () => {
      let body = {
        email: "test@example.com",
        password: "test",
      };

      pool.query.mockResolvedValue({
        rows: [
          {
            email: "test@example.com",
            password: await bcrypt.hash("test", 10),
          },
        ],
      });

      const response = await request(app).post("/auth/signin").send(body);
      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.header["set-cookie"][0]).toEqual(
        expect.stringMatching(/jwt-auth=[^']+HttpOnly; Secure; SameSite=Lax/)
      );
      expect(response.statusCode).toBe(200);
      expect(response.text).toEqual("Account logged in");
    });
  });

  describe("testPublicRequest()", () => {
    test("response success", async () => {
      const response = await request(app).get("/auth/test-public");

      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(200);
      expect(response.text).toEqual("Success");
    });
  });

  describe("testPrivateRequest()", () => {
    test("returns error without token", async () => {
      const response = await request(app).get("/auth/test-private");

      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(403);
      expect(response.text).toEqual("No access token provided");
    });

    test("returns error with incorrect token", async () => {
      const response = await request(app).get("/auth/test-private").set("Cookie", ["jwt-auth=wrong"]);

      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(403);
      expect(response.text).toEqual("Invalid access token");
    });

    test("returns response succesfully", async () => {
      let body = {
        email: "chris@chrisgrime.com",
        password: "test",
      };

      pool.query.mockResolvedValue({
        rows: [
          {
            email: "chris@chrisgrime.com",
            password: await bcrypt.hash("test", 10),
          },
        ],
      });

      const signInResponse = await request(app).post("/auth/signin").send(body);
      let cookie = signInResponse.get("Set-Cookie");

      const response = await request(app)
        .get("/auth/test-private")
        .set("Cookie", [...cookie]);

      expect(response.header["content-type"]).toBe("text/html; charset=utf-8");
      expect(response.statusCode).toBe(200);
      expect(response.text).toEqual("Success with access token");
    });
  });
});
