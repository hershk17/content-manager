import { Request } from "express";
import passport from "passport";
import { Strategy as JwtStrategy } from "passport-jwt";
import { User } from "../../models/user";
import { cookieExtractor } from "../utils/cookie";

// JWT strategy
const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET,
  },
  async (payload, done) => {
    try {
      const user = await User.findOne({ username: payload.username });
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  }
);

passport.use(jwtLogin);
