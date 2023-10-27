import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/user";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.EXPRESS_SERVER_URL}/auth/google/callback`,
  },
  async (_accessToken, _refreshToken, userData, done) => {
    const profile = userData._json;
    try {
      // if user exists we return the user
      const existingUser = await User.findOne({ email: profile.email });
      if (existingUser) {
        return done(null, existingUser);
      }
    } catch (err) {
      console.log(err);
      return done(err as Error, false);
    }
    // user doesn't exist so we create and save to db
    try {
      const newUser = await new User({
        provider: userData.provider,
        googleId: userData.id,
        username: userData.provider + userData.id,
        name: profile.name,
        avatar: profile.picture,
        email: profile.email,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);

passport.use(googleStrategy);
