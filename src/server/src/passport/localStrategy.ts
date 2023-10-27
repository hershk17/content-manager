import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/user";
import { loginSchema } from "../services/validators";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true, // remove this and refactor
  },
  async (req, email, password, done) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return done(null, false);
    }
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: "User does not exist" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err, false);
    }
  }
);

passport.use(localStrategy);
