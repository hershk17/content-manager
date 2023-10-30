import { Router } from "express";
import localAuthRoutes from "./local";
import googleAuthRoutes from "./google";
import steamAuthRoutes from "./steam";
import facebookAuthRoutes from "./facebook";

const router = Router();

// sign in providers
router.use("/", localAuthRoutes);
router.use("/", googleAuthRoutes);
// router.use("/", facebookAuthRoutes);

// account linking providers
router.use("/", steamAuthRoutes);

// logout route
router.get("/logout", (req, res) => {
  res.clearCookie("x-auth-token");
  res.status(200).send("Logged out");
});

export default router;
