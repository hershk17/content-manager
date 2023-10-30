import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { User } from "../models/user";

const cookieExtractor = (req: any) => {
  let token = null;
  if (req && (req.cookies || req.headers)) {
    token = req.cookies["x-auth-token"] ?? req.headers["x-auth-token"];
  }
  return token;
};

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
