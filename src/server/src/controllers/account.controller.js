import Account from "../models/account.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AccountController {
  constructor() {
    this.account = new Account();
  }

  // sign up for an account
  async signUp(request, response, next) {
    try {
      if (!request.body) {
        return response.status(400).send("Missing request body");
      }
      if (!request.body.email) {
        return response.status(400).send("Missing email");
      }
      if (!request.body.password) {
        return response.status(400).send("Missing password");
      }

      // create account with hashed password
      await this.account.createAccount({
        email: request.body.email,
        password: await bcrypt.hash(request.body.password, 10),
      });

      return response.status(201).send("Account created successfully");
    } catch (error) {
      next(error);
    }
  }

  // sign in to the account
  async signIn(request, response) {
    if (!request.body) {
      return response.status(400).send("Missing request body");
    }
    if (!request.body.email) {
      return response.status(400).send("Missing email");
    }
    if (!request.body.password) {
      return response.status(400).send("Missing password");
    }

    // find relevant account by email from db, then compare hashed password with plaintext using bcrypt
    let records = await this.account.findByEmail(request.body.email);
    let isValidPassword = await bcrypt.compare(request.body.password, records[0].password);

    if (!isValidPassword) {
      return response.status(403).send("Incorrect password");
    }

    // create JWT with account info
    let token = jwt.sign(records[0], process.env.JWT_SECRET, { expiresIn: 3600 * 24 });

    // store in cookie
    let cookieOptions = {
      expires: new Date(Date.now() + 3600 * 24),
      secure: process.env.ENVIRONMENT == "Local" ? false : true,
      httpOnly: true,
      sameSite: "Lax",
    };

    return response.status(200).cookie("jwt-auth", token, cookieOptions).send("Account logged in");
  }

  // test functions
  async testPublicRequest(request, response) {
    return response.status(200).send("Success");
  }

  async testPrivateRequest(request, response) {
    return response.status(200).send("Success with access token");
  }
}

export default AccountController;
