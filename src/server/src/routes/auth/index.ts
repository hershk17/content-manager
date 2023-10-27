import { Router } from "express";
import localAuthRoutes from "./local";
import googleAuthRoutes from "./google";
import steamAuthRoutes from "./steam";
import authenticate from "../../middleware/authenticate";

const router = Router();

// sign in providers
router.use("/", localAuthRoutes, googleAuthRoutes);

// account linking providers
router.use("/", authenticate, steamAuthRoutes);

// logout route
router.get("/logout", (req, res) => {
  req.logout(() => {
    req.session.destroy(() => {
      return res.status(201).send("Logged out successfully");
    });
  });
});

export default router;
