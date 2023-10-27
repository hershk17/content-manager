import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // return res.status(201).send("Authenticated successfully");
  res.redirect(process.env.REACT_CLIENT_URL!);
});

export default router;
