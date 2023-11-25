import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { User } from "../../models/user";

const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_CLIENT_ID!,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    callbackURL: `${process.env.VITE_SERVER_URL}/auth/facebook/callback`,
    profileFields: [
      "id",
      "email",
      "displayName",
      "name",
      "picture.type(large)",
    ],
  },
  async (_accessToken, _refreshToken, userData, done) => {
    try {
      const profile = userData._json;
      //   if user exists, return the user
      const existingUser = await User.findOne({ facebookId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      //   if user doesn't exist, create and save to db
      const newUser = await new User({
        username: "f" + profile.id,
        name: profile.name,
        avatar: profile.picture.url,
        email: profile.email,
        provider: "facebook",
        facebookId: profile.id,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.error(err);
      return done(null, false, { message: `Error: ${err}` });
    }
  }
);

passport.use(facebookStrategy);
