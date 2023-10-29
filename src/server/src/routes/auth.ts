import { Router } from "express";
import passport from "passport";
import JWT from "jsonwebtoken";
import { IUser } from "../models/user";

const router = Router();

router.get("/steam", passport.authenticate("steam"));

router.get("/steam/callback", passport.authenticate("steam", { session: false }), (req, res) => {
  if (req.isAuthenticated()) {
    const user = req.user as IUser;
    const token = JWT.sign(
      {
        expiresIn: "14d",
        steamId: user.steamId,
        username: user.username,
        avatar: user.avatar,
      },
      process.env.JWT_SECRET!
    );
    res.cookie("x-auth-token", token, { maxAge: 14 * 24 * 60 * 60 * 1000 });
    res.status(200).redirect(process.env.REACT_CLIENT_URL!);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("x-auth-token");
  res.status(200).send("Logged out");
});

export default router;
