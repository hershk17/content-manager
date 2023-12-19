import { Request } from "express";
import passport from "passport";
import { Strategy as SteamStrategy } from "passport-steam";
import { IUser, User } from "../../models/user";

const steamStrategy = new SteamStrategy(
  {
    apiKey: process.env.STEAM_API_KEY!,
    realm: process.env.VITE_SERVER_URL!,
    returnURL: `${process.env.VITE_SERVER_URL}/auth/steam/callback`,
    passReqToCallback: true,
  },
  async (
    req: Request,
    identifier: string,
    userData: { id: string },
    done: Function
  ) => {
    try {
      const user = req.user as IUser;
      const updatedUser = await User.findOneAndUpdate(
        { username: user.username },
        { steamId: userData.id }
      );
      return done(null, updatedUser);
    } catch (err) {
      console.error(err);
      return done(null, false, { message: `Error: ${err}` });
    }
  }
);

passport.use(steamStrategy);
