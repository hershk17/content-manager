import { Router } from "express";
import passport from "passport";
import JWT from "jsonwebtoken";
import { IUser } from "../../models/user";

const router = Router();

router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as IUser;
      const token = JWT.sign(
        {
          expiresIn: "14d",
          username: user.username,
          email: user.email,
          provider: user.provider,
          facebookId: user.facebookId,
        },
        process.env.JWT_SECRET!
      );
      res.cookie("x-auth-token", token, {
        maxAge: 14 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(200).redirect(process.env.VITE_CLIENT_URL!);
    }
  }
);

export default router;
