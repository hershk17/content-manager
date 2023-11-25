import { Router } from "express";
import passport from "passport";
import requireAuth from "../../middleware/requireAuth";

const router = Router();

router.get("/steam", passport.authenticate("steam"));

router.get(
  "/steam/callback",
  requireAuth,
  passport.authenticate("steam", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      res.status(200).redirect(process.env.VITE_CLIENT_URL!);
    }
  }
);

export default router;
