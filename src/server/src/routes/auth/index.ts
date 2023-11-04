import { Router } from "express";
import googleAuthRoutes from "./google";
import localAuthRoutes from "./local";
import steamAuthRoutes from "./steam";
import requireAuth from "../../middleware/requireAuth";

const router = Router();

router.get("/validate", requireAuth, (req, res) => {
  return res.status(200).json(req.user);
});

router.get("/logout", (req, res) => {
  res.clearCookie("x-auth-token");
  res.status(200).send("Logged out");
});

// sign in providers
router.use("/", localAuthRoutes);
router.use("/", googleAuthRoutes);
// router.use("/", facebookAuthRoutes);

// account linking providers
router.use("/", steamAuthRoutes);

export default router;
