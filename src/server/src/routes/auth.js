import { faker } from "@faker-js/faker";
import { Router } from "express";
import Joi from "joi";
import passport from "passport";
import {requireLocalAuth} from "../middleware/requireAuth.js";
import User from "../models/User.model.js";
import { registerSchema } from "../services/validators.js";

const router = Router();
const clientUrl = process.env.NODE_ENV === "production" ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

// routes for local auth
router.post("/login", requireLocalAuth, (req, res) => {
  const token = req.user.generateJWT();
  const me = req.user.toJSON();
  res.json({ token, me });
});

router.post("/register", async (req, res, next) => {
  const { error } = Joi.validate(req.body, registerSchema);
  if (error) {
    return res.status(422).send({ message: error.details[0].message });
  }

  const { email, password, name, username } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).send({ message: "Email is in use" });
    }

    try {
      const newUser = new User({
        provider: "email",
        email,
        password,
        username,
        name,
        avatar: faker.image.avatar(),
      });

      newUser.registerUser(newUser, (err, user) => {
        if (err) throw err;
        res.json({ message: "Register success." }); // just redirect to login
      });
    } catch (err) {
      return next(err);
    }
  } catch (err) {
    return next(err);
  }
});

// routes for google auth
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie("x-auth-cookie", token);
    res.redirect(clientUrl);
  }
);

// routes for facebook auth
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    const token = req.user.generateJWT();
    res.cookie("x-auth-cookie", token);
    res.redirect(clientUrl);
  }
);

// logout
router.get("/logout", (req, res) => {
  req.logout();
  res.send(false);
});

export default router;
