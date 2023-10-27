import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/steam", passport.authenticate("steam"));

router.get("/steam/callback", passport.authenticate("steam", { session: false }), (req, res) => {
  // return res.status(201).send("Authenticated successfully");
  res.redirect(process.env.REACT_CLIENT_URL!);
});

export default router;
