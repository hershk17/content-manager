import { Router } from "express";
import passport from "passport";

const router = Router();

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
    res.redirect(process.env.CLIENT_URL!);
  }
);

export default router;
