import bcrypt from "bcrypt";
import { Router } from "express";
import passport from "passport";
import { User } from "../../models/user";
import { loginSchema, registerSchema } from "../../services/validators";

const router = Router();

router.post("/login", (req, res, next) => {
  // overriding authenticate's callback so that we can send responses in consistent format
  passport.authenticate("local", (err: any, user: Express.User, info: { message: any }) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(422).send(error.details[0].message);
    }
    if (err) {
      return res.status(500).send("Internal Server Error");
    }
    if (!user) {
      return res.status(401).send(info.message);
    }
    // manually calling login here since we overrode the authenticate callback
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).send("Internal Server Error");
      }
      return res.status(201).send("Logged in successfully");
      // res.redirect(process.env.REACT_CLIENT_URL!);
    });
  })(req, res, next);
});

router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  const { username, email, password } = req.body;
  try {
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail) {
      return res.status(422).send("Email is not available");
    }
    if (existingUsername) {
      return res.status(422).send("Username is not available");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      email: email,
      username: username,
      password: hashedPassword,
    }).save();
    return res.status(201).send("Registered successfully");
    // res.redirect(process.env.REACT_CLIENT_URL!);
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
