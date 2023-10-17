import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "../models/User.model.js";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.JWT_SECRET_DEV);

const isProduction = process.env.NODE_ENV === "production";
const secretOrKey = isProduction ? process.env.JWT_SECRET_PROD : process.env.JWT_SECRET_DEV;

// JWT strategy
const jwtLogin = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader("x-auth-token"),
    secretOrKey,
  },
  async (payload, done) => {
    try {
      const user = await User.findById(payload.id);

      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  }
);

passport.use(jwtLogin);
