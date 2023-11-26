import { Router } from "express";
import JWT from "jsonwebtoken";
import passport from "passport";
import { IUser } from "../../models/user";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as IUser;
      const token = JWT.sign(
        {
          expiresIn: "14d",
          username: user.username,
          email: user.email,
          provider: user.provider,
          googleId: user.googleId,
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
