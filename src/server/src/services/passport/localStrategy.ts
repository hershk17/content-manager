import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../../models/user";
import { loginSchema } from "../utils/validators";

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async (req, email, password, done) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return done(error, false, { message: error.details[0].message });
    }
    try {
      const user = await User.findOne({ provider: "local", email });
      if (!user) {
        return done(null, false, { message: "User does not exist" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: "Invalid password" });
      }
      return done(null, user);
    } catch (err) {
      console.error(err);
      return done(err, false, { message: "Internal Server Error" });
    }
  }
);

passport.use(localStrategy);
