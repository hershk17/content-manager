import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
import { User } from "../models/user";

const steamStrategy = new SteamStrategy(
  {
    apiKey: process.env.STEAM_API_KEY,
    realm: process.env.EXPRESS_SERVER_URL,
    returnURL: `${process.env.EXPRESS_SERVER_URL}/auth/steam/callback`,
  },
  async (identifier: string, userData: any, done: Function) => {
    try {
      // if user exists, return the user
      const existingUser = await User.findOne({ steamId: userData.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // if user doesn't exist, create and save to db
      const newUser = await new User({
        steamId: userData.id,
        username: userData.displayName,
        avatar: userData.photos[1].value,
      }).save();
      return done(null, newUser);
    } catch (err) {
      console.error(err);
      return done(null, false, { message: `Error: ${err}` });
    }
  }
);

passport.use(steamStrategy);
