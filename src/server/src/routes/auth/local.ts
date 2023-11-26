import bcrypt from "bcrypt";
import { Router } from "express";
import JWT from "jsonwebtoken";
import passport from "passport";
import { IUser, User } from "../../models/user";
import { registerSchema } from "../../services/utils/validators";

const router = Router();

router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as IUser;
      const token = JWT.sign(
        {
          expiresIn: "14d",
          username: user.username,
          email: user.email,
          provider: user.provider,
        },
        process.env.JWT_SECRET!
      );
      res.cookie("x-auth-token", token, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).send("Logged in successfully");
    }
  }
);

router.post("/register", async (req, res) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return res.status(422).send(error.details[0].message);
  }
  const { username, email, password } = req.body;
  try {
    const existingEmail = await User.findOne({ provider: "local", email });
    const existingUsername = await User.findOne({ username });
    if (existingEmail) {
      return res.status(422).send("Email is not available");
    }
    if (existingUsername) {
      return res.status(422).send("Username is not available");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username: username,
      email: email,
      password: hashedPassword,
      name: username,
      provider: "local",
    }).save();
    return res.status(201).send("Registered successfully");
    // also login the user?
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).send("Internal Server Error");
  }
});

export default router;
