import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../../models/user";

const serverUrl = process.env.NODE_ENV === "production" ? process.env.SERVER_URL_PROD : process.env.SERVER_URL_DEV;

const googleLogin = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${serverUrl}${process.env.GOOGLE_CALLBACK_URL}`,
    proxy: true,
  },
  async (_accessToken, _refreshToken, userData, done) => {
    try {
      const oldUser = await User.findOne({ email: userData._json.email });

      if (oldUser) {
        return done(null, oldUser);
      }
    } catch (err) {
      console.log(err);
    }

    // register user
    try {
      const newUser = await new User({
        provider: "google",
        googleId: userData.id,
        username: `user${userData.id}`,
        email: userData._json.email,
        name: userData.displayName,
        avatar: userData._json.picture,
      }).save();

      done(null, newUser);
    } catch (err) {
      console.log(err);
    }
  }
);

passport.use(googleLogin);
