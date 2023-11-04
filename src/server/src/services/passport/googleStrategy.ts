import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../../models/user";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.VITE_SERVER_URL}/auth/google/callback`,
  },
  async (_accessToken, _refreshToken, userData, done) => {
    try {
      const profile = userData._json;
      // if user exists, return the user
      const existingUser = await User.findOne({ googleId: profile.sub });
      if (existingUser) {
        return done(null, existingUser);
      }
      // if user doesn't exist, create and save to db
      const newUser = await new User({
        username: "g" + profile.sub,
        name: profile.name,
        avatar: profile.picture,
        email: profile.email,
        provider: "google",
        googleId: profile.sub,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.error(err);
      return done(null, false, { message: `Error: ${err}` });
    }
  }
);

passport.use(googleStrategy);
