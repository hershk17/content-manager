import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
import { User } from "../models/user";

const steamStrategy = new SteamStrategy(
  {
    apiKey: process.env.STEAM_API_KEY,
    realm: process.env.EXPRESS_SERVER_URL,
    returnURL: `${process.env.EXPRESS_SERVER_URL}/auth/steam/callback`,
    passReqToCallback: true,
  },
  async (req: any, identifier: string, userData: any, done: Function) => {
    const currUser = req.user;
    try {
      const updatedUser = await User.findOneAndUpdate({ email: currUser.email }, { steamId: userData.id });
      done(null, updatedUser, { message: "Successfully Linked Steam account" });
    } catch (err) {
      done(null, false, { message: "Internal Server Error" });
      console.log(err);
    }
  }
);

passport.use(steamStrategy);
