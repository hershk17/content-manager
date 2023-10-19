import { Router } from "express";
import passport from "passport";

const router = Router();
const clientUrl = process.env.NODE_ENV === "production" ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/", session: false }),
  (req: any, res) => {
    if (req.user) {
      const token = req.user.generateJWT();
      res.cookie("x-auth-cookie", token);
    }
    res.redirect(clientUrl!);
  }
);

export default router;
