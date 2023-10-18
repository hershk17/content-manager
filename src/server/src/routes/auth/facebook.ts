import { Router } from "express";
import passport from "passport";

const router = Router();
const clientUrl = process.env.NODE_ENV === "production" ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV;

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", { failureRedirect: "/", session: false }),
  (req: any, res) => {
    if (req.user) {
      const token = req.user.generateJWT();
      res.cookie("x-auth-cookie", token);
    }
    res.redirect(clientUrl!);
  }
);

export default router;
